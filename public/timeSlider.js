const timeSlider = document.getElementById("time-slider");
const timeOutput = document.getElementById("selected-time");

timeSlider.addEventListener("input", updateSelectedTime);

function updateSelectedTime() {
    const minutes = parseInt(timeSlider.value);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(2, "0")}`;
    timeOutput.textContent = formattedTime;
}