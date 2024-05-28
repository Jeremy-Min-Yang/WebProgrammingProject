const payBtn = document.querySelector(".btn-buy");

payBtn.addEventListener("click", () => {
    const cartItems = localStorage.getItem("cartItems");

    if (cartItems) {
        fetch("/stripe-checkout", {
            method: "POST",
            headers: new Headers({"Content-Type": "application/json"}),
            body: JSON.stringify({
                items: JSON.parse(cartItems),
            }),
        })
        .then((res) => res.json())
        .then((url) => {
            location.href = url;
        })
        .catch((err) => console.error("Error:", err));
    } else {
        console.error("No items in the cart.");
    }
});
