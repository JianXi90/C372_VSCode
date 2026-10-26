const payments = [
    { petName: "Chester", amount: 50, status: "APPROVED" },
    { petName: "Mochi", amount: 80, status: "PENDING" },
    { petName: "Mira", amount: 40, status: "DECLINED" }
]

console.log(`Mochi's payment status: ${payments[1].status}`);

for (let payment of payments) {
    if (payment.status === "APPROVED") {
        console.log(`Payment for ${payment.petName} is approved. Amount: $${payment.amount}`);
    } else if (payment.status === "PENDING") {
        console.log(`Payment for ${payment.petName} is pending. Amount: $${payment.amount}`);
    } else if (payment.status === "DECLINED") {
        console.log(`Payment for ${payment.petName} is declined. Amount: $${payment.amount}`);
    }
}