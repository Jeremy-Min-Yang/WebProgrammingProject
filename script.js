// script.js
document.getElementById("submit").addEventListener("click", function() {
    const rating = document.getElementById("attractiveness").value;
    // Send the rating to the server (you'll need backend code for this)
    // Update user's personalized view based on the rating
    alert("Rating submitted: " + rating);
});
