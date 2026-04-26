import dbConnect from '../lib/mongodb.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Customer from '../models/Customer.js';

export const getDashboardStats = async (period = 'Weekly') => {
    await dbConnect();

    // 1. Total Counts
    const totalOrders = await Order.countDocuments({ orderStatus: { $ne: 'Cancelled' } });
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const lowStockCount = await Product.countDocuments({ stock: { $lt: 5 } });
    
    // Category Counts
    const totalInverters = await Product.countDocuments({ category: { $regex: /^inverter/i } });
    const totalBatteries = await Product.countDocuments({ category: { $regex: /^batter/i } });
    const totalCombos = await Product.countDocuments({ category: { $regex: /^combo/i } });

    // 2. Revenue Aggregation
    const revenueStats = await Order.aggregate([
        { $match: { orderStatus: { $ne: 'Cancelled' } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueStats[0]?.total || 0;

    // 3. Periodic Stats (Current period)
    const now = new Date();
    let startDate;
    if (period === 'Daily') {
        startDate = new Date(now.setHours(0, 0, 0, 0));
    } else if (period === 'Weekly') {
        startDate = new Date(new Date().setDate(now.getDate() - 7));
    } else if (period === 'Monthly') {
        startDate = new Date(new Date().setMonth(now.getMonth() - 1));
    } else {
        startDate = new Date(new Date().setFullYear(now.getFullYear() - 1));
    }

    const periodicStats = await Order.aggregate([
        { $match: { createdAt: { $gte: startDate }, orderStatus: { $ne: 'Cancelled' } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" }, count: { $sum: 1 } } }
    ]);

    // 4. Recent Orders
    const recentOrders = await Order.find()
        .sort({ createdAt: -1 })
        .limit(5);

    // 5. Build Granular Order Trend (6 slots for chart)
    let trendData = [0, 0, 0, 0, 0, 0];
    
    if (period === 'Daily') {
        const hourlyStats = await Order.aggregate([
            { $match: { createdAt: { $gte: startDate }, orderStatus: { $ne: 'Cancelled' } } },
            { $group: {
                // Map hour to 6 slots: 6-10(0), 10-14(1), 14-18(2), 18-22(3), 22-02(4), 02-06(5)
                _id: { $floor: { $divide: [{ $mod: [{ $add: [{ $hour: "$createdAt" }, 18] }, 24] }, 4] } },
                count: { $sum: 1 }
            }}
        ]);
        hourlyStats.forEach(stat => {
            if (stat._id >= 0 && stat._id < 6) trendData[stat._id] = stat.count;
        });
    } else if (period === 'Weekly') {
        const weeklyStats = await Order.aggregate([
            { $match: { createdAt: { $gte: startDate }, orderStatus: { $ne: 'Cancelled' } } },
            { $group: {
                _id: { $dayOfWeek: "$createdAt" },
                count: { $sum: 1 }
            }}
        ]);
        // Map Mongo dayOfWeek (1=Sun to 7=Sat) to chart order
        trendData = [0, 0, 0, 0, 0, 0, 0]; // 7 days
        weeklyStats.forEach(stat => {
            const index = stat._id === 1 ? 6 : stat._id - 2;
            if (index >= 0 && index < 7) trendData[index] = stat.count;
        });
    } else {
        trendData = [0, 0, 0, 0, 0, 0, (periodicStats[0]?.count || 0)];
    }

    // Ensure trendData always has at least 6 values for the UI
    while(trendData.length < 6) trendData.push(0);

    return {
        success: true,
        stats: {
            totalOrders,
            totalProducts,
            totalCustomers,
            totalRevenue,
            periodicRevenue: periodicStats[0]?.total || 0,
            periodicOrders: periodicStats[0]?.count || 0,
            lowStockCount,
            totalInverters,
            totalBatteries,
            totalCombos,
            orderTrend: trendData
        },
        recentOrders
    };
};
