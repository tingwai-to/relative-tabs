const allCharacterStyles = [
    [
        null,  // current tab (index=0) doesn't need unicode character
        '\uFF11',  // fullwidth digit one (U+FF11)
        '\uFF12',  // fullwidth digit two (U+FF12)
        '\uFF13',  // fullwidth digit three (U+FF13)
        '\uFF14',  // fullwidth digit four (U+FF14)
        '\uFF15',  // fullwidth digit five (U+FF15)
        '\uFF16',  // fullwidth digit six (U+FF16)
        '\uFF17',  // fullwidth digit seven (U+FF17)
        '\uFF18',  // fullwidth digit eight (U+FF18)
        '\uFF19',  // fullwidth digit nine (U+FF19)
    ],
    [
        null,  // current tab (index=0) doesn't need unicode character
        '\u2488',  // digit one full stop (U+2488)
        '\u2489',  // digit two full stop (U+2489)
        '\u248A',  // digit three full stop (U+248A)
        '\u248B',  // digit four full stop (U+248B)
        '\u248C',  // digit five full stop (U+248C)
        '\u248D',  // digit six full stop (U+248D)
        '\u248E',  // digit seven full stop (U+248E)
        '\u248F',  // digit eight full stop (U+248F)
        '\u2490',  // digit nine full stop (U+2490)
    ],
    [
        null,  // current tab (index=0) doesn't need unicode character
        '\u2474',  // parenthesized digit one (U+2474)
        '\u2475',  // parenthesized digit two (U+2475)
        '\u2476',  // parenthesized digit three (U+2476)
        '\u2477',  // parenthesized digit four (U+2477)
        '\u2478',  // parenthesized digit five (U+2478)
        '\u2479',  // parenthesized digit six (U+2479)
        '\u247A',  // parenthesized digit seven (U+247A)
        '\u247B',  // parenthesized digit eight (U+247B)
        '\u247C',  // parenthesized digit nine (U+247C)
    ],
    [
        null,  // current tab (index=0) doesn't need unicode character
        '\u00B9',  // superscript one (U+00B9)
        '\u00B2',  // superscript two (U+00B2)
        '\u00B3',  // superscript three (U+00B3)
        '\u2074',  // superscript four (U+2074)
        '\u2075',  // superscript five (U+2075)
        '\u2076',  // superscript six (U+2076)
        '\u2077',  // superscript seven (U+2077)
        '\u2078',  // superscript eight (U+2078)
        '\u2079',  // superscript nine (U+2079)
    ],
    [
        null,  // current tab (index=0) doesn't need unicode character
        '\u2081',  // subscript one (U+2081)
        '\u2082',  // subscript two (U+2082)
        '\u2083',  // subscript three (U+2083)
        '\u2084',  // subscript four (U+2084)
        '\u2085',  // subscript five (U+2085)
        '\u2086',  // subscript six (U+2086)
        '\u2087',  // subscript seven (U+2087)
        '\u2088',  // subscript eight (U+2088)
        '\u2089',  // subscript nine (U+2089)
    ],
    [
        null,  // current tab (index=0) doesn't need unicode character
        '\u2460',  // circled digit one (U+2460)
        '\u2461',  // circled digit two (U+2461)
        '\u2462',  // circled digit three (U+2462)
        '\u2463',  // circled digit four (U+2463)
        '\u2464',  // circled digit five (U+2464)
        '\u2465',  // circled digit six (U+2465)
        '\u2466',  // circled digit seven (U+2466)
        '\u2467',  // circled digit eight (U+2467)
        '\u2468',  // circled digit nine (U+2468)
    ],
    [
        null,  // current tab (index=0) doesn't need unicode character
        '\u2780',  // dingbat circled sans-serif digit one (U+2780)
        '\u2781',  // dingbat circled sans-serif digit two (U+2781)
        '\u2782',  // dingbat circled sans-serif digit three (U+2782)
        '\u2783',  // dingbat circled sans-serif digit four (U+2783)
        '\u2784',  // dingbat circled sans-serif digit five (U+2784)
        '\u2785',  // dingbat circled sans-serif digit six (U+2785)
        '\u2786',  // dingbat circled sans-serif digit seven (U+2786)
        '\u2787',  // dingbat circled sans-serif digit eight (U+2787)
        '\u2788',  // dingbat circled sans-serif digit nine (U+2788)
    ],
    [
        null,  // current tab (index=0) doesn't need unicode character
        '\u2776',  // dingbat negative circled digit one (U+2776)
        '\u2777',  // dingbat negative circled digit two (U+2777)
        '\u2778',  // dingbat negative circled digit three (U+2778)
        '\u2779',  // dingbat negative circled digit four (U+2779)
        '\u277A',  // dingbat negative circled digit five (U+277A)
        '\u277B',  // dingbat negative circled digit six (U+277B)
        '\u277C',  // dingbat negative circled digit seven (U+277C)
        '\u277D',  // dingbat negative circled digit eight (U+277D)
        '\u277E',  // dingbat negative circled digit nine (U+277E)
    ],
    [
        null,  // current tab (index=0) doesn't need unicode character
        '\u278A',  // dingbat negative circled sans-serif digit one (U+278A)
        '\u278B',  // dingbat negative circled sans-serif digit two (U+278B)
        '\u278C',  // dingbat negative circled sans-serif digit three (U+278C)
        '\u278D',  // dingbat negative circled sans-serif digit four (U+278D)
        '\u278E',  // dingbat negative circled sans-serif digit five (U+278E)
        '\u278F',  // dingbat negative circled sans-serif digit six (U+278F)
        '\u2790',  // dingbat negative circled sans-serif digit seven (U+2790)
        '\u2791',  // dingbat negative circled sans-serif digit eight (U+2791)
        '\u2792',  // dingbat negative circled sans-serif digit nine (U+2792)
    ],

];

// flattens and concats all characters in allCharacterStyles into string
const characterStylesConcat = [].concat.apply([], allCharacterStyles).join("");
