document.getElementById("sizeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);

    // Convert height from cm to meters
    const heightInMeters = height / 100;

    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);

    let size = '';

    if (bmi < 18.5) {
        size = 'XS';
    } else if (bmi >= 18.5 && bmi < 25) {
        size = 'S-M';
    } else if (bmi >= 25 && bmi < 30) {
        size = 'L';
    } else if (bmi >= 30 && bmi < 35) {
        size = 'XL';
    } else {
        size = 'XXL or Larger';
    }

    // Display result
    document.getElementById("result").textContent = `Estimated Clothing Size: ${size}`;
});
