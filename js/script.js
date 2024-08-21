const apiKey = 'YOUR_DEEPL_API_KEY'; // Replace with your DeepL API key

let originalText = '';

document.getElementById('redactButton').addEventListener('click', async () => {
    const inputElement = document.getElementById('inputText');
    const outputElement = document.getElementById('outputText');
    originalText = inputElement.value;
    let inputText = originalText;

    // Regular expression to find figures (numbers with or without commas and dollar sign)
    const figureRegex = /\$\d[\d,]*(\.\d+)?|\d[\d,]*(\.\d+)?/g;
    // Replace matched figures with [REDACTED]
    let redactedText = inputText.replace(figureRegex, '[REDACTED]');

    // Translate the redacted text to Traditional Chinese
    const translatedText = await translateText(redactedText);

    // Update the input and output elements with translated and redacted content
    inputElement.value = redactedText;
    outputElement.value = translatedText;
});

document.getElementById('restoreButton').addEventListener('click', () => {
    const outputElement = document.getElementById('outputText');
    // Restore the original text in the output element
    outputElement.value = originalText;
});

// Function to call DeepL API
async function translateText(text) {
    const url = 'https://api-free.deepl.com/v2/translate';
    const params = new URLSearchParams();
    params.append('auth_key', apiKey);
    params.append('text', text);
    params.append('target_lang', 'ZH'); // Set target language to Traditional Chinese (ZH)

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });

    const result = await response.json();
    return result.translations[0].text;
}