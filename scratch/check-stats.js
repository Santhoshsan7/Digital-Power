async function checkStats() {
    try {
        const res = await fetch('http://localhost:3000/api/admin/stats?period=weekly');
        const data = await res.json();
        console.log("Stats Result:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Fetch failed:", err.message);
    }
}
checkStats();
