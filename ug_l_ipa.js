(async function () {
    return (await fetch("https://raw.githubusercontent.com/" +
        "tyrkbodn/common-turkic-latin-alphabet/master/A_TO_L.json")).json();
})().then(map_json => {
    let map = new Map(
        [...Object.entries(map_json)]
            .sort((a, b) => b[0].length - a[0].length)
    );

    map.forEach((value, key) => {
        if (key.length == 2) {
            if (!(key[1] in map)) {
                map.set(key[1], value);
            }
        }
    });

    let map_regex = new Map(
        [...map.entries()]
            .map(element => [new RegExp(element[0], 'g'), element[1]])
            .sort((a, b) => b[0].source.length - a[0].source.length)
    );

    let reshape = x => x
        .split("؟").join("?")
        .split("،").join(",")
        .split("«").join("\"")
        .split("»").join("\"")
        .split("\u200F").join("");

    let format = x => "\u200E" + "/" + reshape(x) + "/";

    setInterval(() => {
        if (document.getElementsByClassName
            ("tlid-translation translation")[0] && document.getElementsByClassName
                ("tlid-transliteration-content transliteration-content full")[1]) {
            let translation =
                document.getElementsByClassName
                    ("tlid-translation translation")[0].innerText;

            let transliteration_i = translation;
            map.forEach((value, key) => {
                transliteration_i = transliteration_i.split(key).join(value["i"][1]);
            });
            transliteration_i = transliteration_i.split("").map(c => {
                let replacement = null;
                map.forEach((value, key) => {
                    if (key.includes(c)) {
                        let count = 0;
                        for (let k of key) {
                            if (k == c) {
                                count += 1;
                                if (count > 1) {
                                    replacement = value["i"][1];
                                }
                            }
                        }
                    }
                });
                map.forEach((value, key) => {
                    if (key.includes(c)) {
                        replacement = value["i"][1];
                    }
                });
                return replacement ? replacement : c;
            }).join("");
            transliteration_i = "\u200E" + "/" + reshape(transliteration_i) + "/";

            transliteration_l = translation;
            map.forEach((value, key) => {
                transliteration_l = transliteration_l.split(key).join(value["l"]);
            });
            transliteration_l = transliteration_l.split("").map(c => {
                let replacement = null;
                map.forEach((value, key) => {
                    if (key.includes(c)) {
                        let count = 0;
                        for (let k of key) {
                            if (k == c) {
                                count += 1;
                                if (count > 1) {
                                    replacement = value["l"];
                                }
                            }
                        }
                    }
                });
                map.forEach((value, key) => {
                    if (key.includes(c)) {
                        replacement = value["l"];
                    }
                });
                return replacement ? replacement : c;
            }).join("");
            transliteration_l = "\u200E" + reshape(transliteration_l);

            innerText =
                ("tlid-transliteration-content transliteration-content full")[1].innerText =
                transliteration_l +
                "\n" + "\n" + "\n" +
                transliteration_i;

            if (document.getElementsByClassName
                ("tlid-transliteration-content transliteration-content full")[1].innerText !=
                innerText) {
                document.getElementsByClassName
                    ("tlid-transliteration-content transliteration-content full")[1].innerText =
                    transliteration_l +
                    "\n" + "\n" + "\n" +
                    transliteration_i;
            }
        }
    }, 512);
});
