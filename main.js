const axios = require('axios');
const fs = require('fs');
const path = require('path');

const LIST_DIR = 'h6'
const LIST_WORD_PATH = './list_word/' + LIST_DIR
const OUTPUT_PATH = './output/' + LIST_DIR

// Hàm tra từ điển bằng API cho kiểu 'word'
async function traTuWord(word) {
    const encodedWord = encodeURIComponent(word);
    const apiUrl = `https://api.hanzii.net/api/search/vi/${encodedWord}?type=word&page=1&limit=50`;

    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(`Lỗi khi tra từ (word): ${word} - ${error.message}`);
    }
    return null;
}

// Hàm tra từ điển bằng API cho kiểu 'kanji'
async function traTuKanji(word) {
    const encodedWord = encodeURIComponent(word);
    const apiUrl = `https://api.hanzii.net/api/search/vi/${encodedWord}?type=kanji&page=1&limit=50`;

    try {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(`Lỗi khi tra từ (kanji): ${word} - ${error.message}`);
    }
    return null;
}

// Hàm tra cứu nhiều từ và lưu kết quả vào các file riêng biệt
async function traNhieuTu(wordList) {
    for (const word of wordList) {
        const [wordResult, kanjiResult] = await Promise.all([
            traTuWord(word),
            traTuKanji(word)
        ]);

        if (wordResult) {
            const wordFileName = `${OUTPUT_PATH}/${word}_word_output.json`;
            const wordFilePath = path.join(__dirname, wordFileName);
            fs.writeFile(wordFilePath, JSON.stringify(wordResult, null, 4), 'utf8', (err) => {
                if (err) {
                    console.error(`Không thể ghi file cho từ (word): ${word} - ${err.message}`);
                } else {
                    console.log(`Đã lưu kết quả từ (word) của từ ${word} vào file ${wordFileName}`);
                }
            });
        }

        if (kanjiResult) {
            const kanjiFileName = `${OUTPUT_PATH}/${word}_kanji_output.json`;
            const kanjiFilePath = path.join(__dirname, kanjiFileName);
            fs.writeFile(kanjiFilePath, JSON.stringify(kanjiResult, null, 4), 'utf8', (err) => {
                if (err) {
                    console.error(`Không thể ghi file cho từ (kanji): ${word} - ${err.message}`);
                } else {
                    console.log(`Đã lưu kết quả từ (kanji) của từ ${word} vào file ${kanjiFileName}`);
                }
            });
        }
    }
}

// Danh sách từ cần tra cứu
const listWords = require(LIST_WORD_PATH).listWords;
console.log('listWords: ', listWords.length)

// Gọi hàm traNhieuTu để bắt đầu tra cứu và lưu kết quả
traNhieuTu(listWords);
