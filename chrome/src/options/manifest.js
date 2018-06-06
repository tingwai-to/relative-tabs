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
            "name": "tabNumCharacterSet",
            "type": "radioButtons",
            "label": "Tab numbering character set:",
            "options": [
                {value: "text", text: "Plain text"},
                {value: "unicode1", text: "Variation A"},
                {value: "unicode2", text: "Variation B"},
                {value: "unicode3", text: "Variation C"},
            ]
        }
    ],
    "alignment": [
    ]
};
