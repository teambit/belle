/**
 * ## Localization support for date picker component. For date picker, the following parameters can be provided for a locale
 * * monthNames: Array for month names from January to December
 * * dayNamesMin: Array for day short names
 * * firstDay: First day of week (0 for Sunday, 1 for Monday, ...)
 * * weekEnd: Weekend in that locale (0 for Sunday, 1 for Monday, ...)
 * * isRTL: The text in that locale is written from right to left
 * 
 * In case any of these fields is not provided the defaults for English calendar will be used.
 * 
 * For extended information see the Belle [documentation](http://nikgraf.github.io/belle/#/configuration?_k=pbr5zm)
 * @bit
 */
const i18nConfig = {

  localeData: {
    nl: {
      monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
        'juli', 'augustus', 'september', 'oktober', 'november', 'december',
      ],
      dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
      firstDay: 1,
      weekEnd: 0,
      isRTL: false,
    },
    ar: {
      monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
      ],
      dayNamesMin: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
      firstDay: 6,
      weekEnd: 5,
      isRTL: true,
    },
    he: {
      monthNames: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
        'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
      ],
      dayNamesMin: ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'],
      firstDay: 0,
      weekEnd: 6,
      isRTL: true,
    },
    fr: {
      monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
      ],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      firstDay: 1,
      weekEnd: 0,
      isRTL: false,
    },
    'zh-CN': {
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
        '七月', '八月', '九月', '十月', '十一月', '十二月',
      ],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      firstDay: 1,
      weekEnd: 0,
      isRTL: false,
    },
  },

};

export default i18nConfig;
