const map_source =
    "https://raw.githubusercontent.com/" +
    "tyrkbodn/" +
    "common-turkic-latin-alphabet/master/A_TO_L.json";

fetch(map_source)
    .then(map_data => map_data.json())
    .then(map_json => {
        let map = new Map(
            [...Object.entries(map_json)]
                .sort((a, b) => b[0].length - a[0].length)
        );

        for (let [key, value] of map) {
            if (key.length == 2) {
                if (!(key[1] in map)) {
                    map.set(key[1], value);
                }
            }
        }

        let uyghur_to_latin = "const uyghur_to_latin = [\n";
        uyghur_to_latin +=
            [...map.entries()].concat([
                ["؟", { "l": "?", "i": "Question Mark" }],
                ["،", { "l": ",", "i": "Comma" }],
                ["«", { "l": "\\\"", "i": "Double Quotation Mark Begin" }],
                ["»", { "l": "\\\"", "i": "Double Quotation Mark Begin" }],
                ["\u200F", { "l": "", "i": "Right To Left Mark" }]
            ])
                .map(x =>
                    "    [ " +
                    "/" + x[0] + "/g" + (x[0].length == 1 ? " " : "") + (x[1]["l"].length == 0 ? " " : "") +
                    " , " +
                    "\"" + x[1]["l"] + "\"" + (x[1]["l"].length == 1 ? " " : "") + (x[1]["l"].length == 0 ? "  " : "") +
                    " ],    // " + x[1]["i"])
                .join("\n");
        uyghur_to_latin += "\n];";

        let entries_to_map = "const map = new Map(uyghur_to_latin);"

        let translation_container = "let translation_container = \"tlid-translation translation\";";

        let transliteration_container = "let transliteration_container = \"tlid-transliteration-content transliteration-content full\";";
        
        let translation = "let translation = \"\";";

        let operator =
        "setInterval(function () {\n" +
        "    " + "if (\n" +
        "    " + "    " + "document.getElementsByClassName(transliteration_container)[1] &&\n" +
        "    " + "    " + "document.getElementsByClassName(translation_container)[0] &&\n" +
        "    " + "    " + "document.getElementsByClassName(translation_container)[0].innerText != translation) {\n\n" +
        "    " + "    " + "translation = document.getElementsByClassName(translation_container)[0].innerText;\n\n" +
        "    " + "    " + "let transliteration = translation;\n" +
        "    " + "    " + "for (let [ key, value ] of map) {\n" +
        "    " + "    " + "    " + "transliteration = transliteration.replace(key, value);\n" +
        "    " + "    " + "}\n\n" +
        "    " + "    " + "document.getElementsByClassName(transliteration_container)[1].innerText = transliteration;\n" +
        "    " + "}\n" +
        "}, 512);";

        console.log([
            uyghur_to_latin,
            entries_to_map,
            transliteration_container,
            translation_container,
            translation,
            operator
        ].join("\n\n"));
    });
