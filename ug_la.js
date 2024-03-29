const uyghur_to_latin = [
    [ /ي‍‍ۇ/g , "yu" ],    // /ju/
    [ /ي‍‍ا/g , "ya" ],    // /ja/
    [ /ئا/g , "a"  ],    // /ɑ/
    [ /ئە/g , "e"  ],    // /ɛ/
    [ /ئې/g , "ë"  ],    // /e/
    [ /ئى/g , "i"  ],    // /i/
    [ /ئۆ/g , "ö"  ],    // /ø/
    [ /ئو/g , "o"  ],    // /o/
    [ /ئۇ/g , "u"  ],    // /u/
    [ /ئۈ/g , "ü"  ],    // /y/
    [ /م/g  , "m"  ],    // /m/
    [ /ن/g  , "n"  ],    // /n/
    [ /د/g  , "d"  ],    // /d/
    [ /ت/g  , "t"  ],    // /t/
    [ /ب/g  , "b"  ],    // /b/
    [ /پ/g  , "p"  ],    // /p/
    [ /ف/g  , "f"  ],    // /f/
    [ /ق/g  , "q"  ],    // /q/
    [ /ك/g  , "k"  ],    // /k/
    [ /ڭ/g  , "ng" ],    // /ŋ/
    [ /گ/g  , "g"  ],    // /ɡ/
    [ /غ/g  , "gh" ],    // /ʁ/
    [ /ھ/g  , "h"  ],    // /h/
    [ /خ/g  , "x"  ],    // /χ/
    [ /چ/g  , "ch" ],    // /t͡ʃ/
    [ /ج/g  , "j"  ],    // /d͡ʒ/
    [ /ژ/g  , "zh" ],    // /ʒ/
    [ /ز/g  , "z"  ],    // /z/
    [ /س/g  , "s"  ],    // /s/
    [ /ش/g  , "sh" ],    // /ʃ/
    [ /ر/g  , "r"  ],    // /r/
    [ /ل/g  , "l"  ],    // /l/
    [ /ي/g  , "y"  ],    // /j/
    [ /ۋ/g  , "w"  ],    // /v/
    [ /ا/g  , "a"  ],    // /ɑ/
    [ /ە/g  , "e"  ],    // /ɛ/
    [ /ې/g  , "ë"  ],    // /e/
    [ /ى/g  , "i"  ],    // /i/
    [ /ۆ/g  , "ö"  ],    // /ø/
    [ /و/g  , "o"  ],    // /o/
    [ /ۇ/g  , "u"  ],    // /u/
    [ /ۈ/g  , "ü"  ],    // /y/
    [ /؟/g  , "?"  ],    // Question Mark
    [ /،/g  , ","  ],    // Comma
    [ /«/g  , "\"" ],    // Double Quotation Mark Begin
    [ /»/g  , "\"" ],    // Double Quotation Mark Begin
    [ /‏/g   , ""   ],    // Right To Left Mark
];

const map = new Map(uyghur_to_latin);

let transliteration_container = "kO6q6e"; // "tlid-transliteration-content transliteration-content full";

let translation_container = "ryNqvb"; // "tlid-translation translation";

let translation = "";

setInterval(function () {
    if (
        document.getElementsByClassName(transliteration_container)[1] &&
        document.getElementsByClassName(translation_container)[0] &&
        document.getElementsByClassName(translation_container)[0].innerText != translation) {

        translation = document.getElementsByClassName(translation_container)[0].innerText;

        let transliteration = translation;
        for (let [ key, value ] of map) {
            transliteration = transliteration.replace(key, value);
        }

        document.getElementsByClassName(transliteration_container)[1].innerText = transliteration;
    }
}, 512);
