this.manifest = {
    "name": "Relative Tabs",
    "settings": [
        {
            "tab": i18n.get("general"),
            "group": i18n.get("shortcuts"),
            "name": "myDescription",
            "type": "description",
            "text": i18n.get("shortcuts-description")
        },
        {
            "tab": i18n.get("general"),
            "group": i18n.get("options"),
            "name": "disableTabNumber",
            "type": "checkbox",
            "label": "Disable adding numbering to tab title"
        },
        {
            "tab": i18n.get("general"),
            "group": i18n.get("options"),
            "name": "whitespace",
            "type": "description",
            "text": ""

        },
        {
            "tab": i18n.get("general"),
            "group": i18n.get("options"),
            "name": "tabNumCharacterStyle",
            "type": "radioButtons",
            "label": "Tab numbering character style:",
            "options": [
                {value: 0, text: "Plain"},
                {value: 1, text: "Digit with full stop"},
                {value: 2, text: "Digit in parentheses"},
                {value: 3, text: "Superscript"},
                {value: 4, text: "Subscript"},
                {value: 5, text: "Circled"},
                {value: 6, text: "Circled sans-serif"},
                {value: 7, text: "Circled negative"},
                {value: 8, text: "Circled negative sans-serif"},
            ]
        }
    ],
    "alignment": [
    ]
};
