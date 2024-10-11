document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const photo = document.getElementById("photo");
    const captureBtn = document.getElementById("captureBtn");
    const colorsDiv = document.getElementById("colors");
    const recDiv = document.getElementById("rec");

    // Access the user's webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
        })
        .catch(err => console.error("Error accessing webcam: ", err));

    // Capture a photo from the webcam
    captureBtn.addEventListener("click", () => {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to an image
        const dataURL = canvas.toDataURL("image/png");
        photo.src = dataURL;

        // Call the function analyzeColors after defining it
        analyzeColors(photo);
    });

    // Analyze the colors using Color Thief
    function analyzeColors(imgElement) {
        const colorThief = new ColorThief();

        imgElement.onload = () => {
            const dominantColor = colorThief.getColor(imgElement);
            const palette = colorThief.getPalette(imgElement, 6);
            displayColors(palette);
            const season = determineSeason(dominantColor);
            displaySeason(season);
            displayFashionRecommendations(season);
        };
    }

    // Display the dominant colors
    function displayColors(palette) {
        colorsDiv.innerHTML = '';
        palette.forEach(color => {
            colorsDiv.innerHTML += `<div class="color-block" style="background-color: rgb(${color[0]}, ${color[1]}, ${color[2]});"></div>`;
        });
    }

    // Determine the user's season based on the dominant color
    function determineSeason(color) {
        const [r, g, b] = color;

        if (r > 200 && g > 180 && b > 150) return 'Spring';  // Light, warm, clear colors
        if (r < 150 && g < 150 && b > 200) return 'Summer';  // Cool, soft, light colors
        if (r > 150 && g < 100 && b < 100) return 'Autumn';  // Deep, warm, muted colors
        if (r < 100 && g < 100 && b < 100) return 'Winter';  // Cool, deep, clear colors
        
        return 'Unknown';  // In case no match is found
    }

    // Display the user's season
    function displaySeason(season) {
        const seasonDiv = document.createElement('div');
        seasonDiv.className = 'season-result';
        seasonDiv.textContent = `Your season is: ${season}`;
        colorsDiv.appendChild(seasonDiv);
    }

    // Display detailed fashion recommendations based on season and occasions
    function displayFashionRecommendations(season) {
        let recommendations = '';

        switch (season) {
            case 'Spring':
                recommendations = `
                    <h3 id = "recc">Fashion Recommendations for Women - Spring:</h3>
                    <ul id = "recc">
                        <li><strong>Colors:</strong> Bright pastels, light yellows, peaches, mint greens, and lavender.</li>
                        <li><strong>Casual:</strong> Flowy dresses, light blouses, and pastel-colored pants.</li>
                        <li><strong>Work:</strong> Tailored trousers, soft blazers, and light-colored shirts in pastel shades.</li>
                        <li><strong>Evening:</strong> A-line dresses with floral prints or a chic pastel jumpsuit.</li>
                        <li><strong>Accessories:</strong> Delicate gold or rose-gold jewelry, light scarves, and nude or soft-colored bags.</li>
                    </ul>
                    <h3 id = "recc">Fashion Recommendations for Men - Spring:</h3>
                    <ul id = "recc">
                        <li><strong>Colors:</strong> Soft pastels, light blues, mint greens, and beige.</li>
                        <li><strong>Casual:</strong> Light chinos, cotton shirts, and casual blazers.</li>
                        <li><strong>Work:</strong> Slim-fit suits in light grays or beige, paired with pastel shirts.</li>
                        <li><strong>Evening:</strong> Crisp button-down shirts with light jackets or pastel sweaters.</li>
                        <li><strong>Accessories:</strong> Leather loafers, light scarves, and belts in neutral tones.</li>
                    </ul>
                `;
                break;
            case 'Summer':
                recommendations = `
                    <h3 id = "recc">Fashion Recommendations for Women - Summer:</h3>
                    <ul id = "recc">
                        <li><strong>Colors:</strong> Cool, soft shades like sky blues, soft pinks, lilac, and icy grays.</li>
                        <li><strong>Casual:</strong> Lightweight cotton or linen dresses, denim shorts, and airy tops in light colors.</li>
                        <li><strong>Work:</strong> Light blazers paired with soft blouses, cropped trousers, and soft, cool shades.</li>
                        <li><strong>Evening:</strong> Flowing maxi dresses, strappy heels, and elegant, light-toned outfits.</li>
                        <li><strong>Accessories:</strong> Silver jewelry, sunhats, light scarves, and pastel handbags.</li>
                    </ul>
                    <h3 id = "recc">Fashion Recommendations for Men - Summer:</h3>
            <ul id = "recc">
                <li><strong>Colors:</strong> Cool, soft shades like pale blues, light grays, whites, and soft yellows.</li>
                <li><strong>Casual:</strong> Linen shorts, light cotton shirts, and casual loafers.</li>
                <li><strong>Work:</strong> Lightweight blazers, crisp white shirts, and tailored trousers.</li>
                <li><strong>Evening:</strong> Light-colored dress shirts with lightweight blazers or casual jackets.</li>
                <li><strong>Accessories:</strong> Minimalist watches, light-colored hats, and sunglasses.</li>
            </ul>
                `;
                break;
            case 'Autumn':
                recommendations = `
                    <h3>Fashion Recommendations for Women - Autumn:</h3>
                    <ul id = "recc">
                        <li><strong>Colors:</strong> Warm, earthy tones like mustard yellows, burnt oranges, rich browns, and forest greens.</li>
                        <li><strong>Casual:</strong> Chunky sweaters, corduroy pants, and plaid shirts in deep, muted tones.</li>
                        <li><strong>Work:</strong> Tweed blazers, warm-toned trousers, and dark-colored blouses or sweaters.</li>
                        <li><strong>Evening:</strong> Long-sleeve dresses in deep reds or oranges, paired with ankle boots.</li>
                        <li><strong>Accessories:</strong> Leather boots, scarves, and gold jewelry that complements warm, earthy outfits.</li>
                    </ul>
                    <h3>Fashion Recommendations for Men - Autumn:</h3>
            <ul id = "recc">
                <li><strong>Colors:</strong> Rich browns, olive greens, mustard yellows, and burgundy.</li>
                <li><strong>Casual:</strong> Corduroy pants, plaid shirts, and chunky knit sweaters.</li>
                <li><strong>Work:</strong> Dark blazers, wool trousers, and warm-toned shirts in earthy shades.</li>
                <li><strong>Evening:</strong> Tailored jackets with dark denim or wool trousers.</li>
                <li><strong>Accessories:</strong> Leather boots, warm scarves, and textured belts.</li>
            </ul>
                `;
                break;
            case 'Winter':
                recommendations = `
                    <h3>Fashion Recommendations for Women - Winter:</h3>
                    <ul id = "recc">
                        <li><strong>Colors:</strong> Bold, cool colors like black, white, navy, emerald greens, and ruby reds.</li>
                        <li><strong>Casual:</strong> Turtlenecks, long coats, and structured outfits in jewel tones.</li>
                        <li><strong>Work:</strong> Sharp blazers, dark-colored trousers, and crisp shirts in neutral or cool tones.</li>
                        <li><strong>Evening:</strong> Elegant, bold dresses in black, deep blues, or metallic fabrics for formal events.</li>
                        <li><strong>Accessories:</strong> Bold statement necklaces, structured handbags, and black leather boots.</li>
                    </ul>
                    <h3>Fashion Recommendations for Men - Winter:</h3>
            <ul id = "recc">
                <li><strong>Colors:</strong> Deep, cool tones like navy blue, charcoal, black, and emerald green.</li>
                <li><strong>Casual:</strong> Heavy wool coats, dark jeans, and turtlenecks.</li>
                <li><strong>Work:</strong> Dark suits with crisp white shirts, and structured overcoats.</li>
                <li><strong>Evening:</strong> Sharp blazers paired with dark trousers or tailored coats.</li>
                <li><strong>Accessories:</strong> Bold scarves, leather gloves, and statement watches.</li>
            </ul>
                `;
                break;
            default:
                recommendations = 'Unable to determine season. Try capturing a clearer image.';
        }

        // Display recommendations in the `#rec` div
        recDiv.innerHTML = recommendations;
    }

});