const faker = require('faker')
const RandExp = require('randexp');
const util = require('./util')
/**
 * The actual schema.
 * @type {Object}
 */
exports.rowFormats = {
    1: function() {
      return ['1',`${faker.name.firstName()}`,`C${faker.name.lastName()}`, faker.address.streetAddress(),
      faker.address.city(), faker.address.stateAbbr()+faker.address.zipCode()+util.generate(4),
      util.generate(34)+util.getFormattedDate(faker.date.past())+'EN'+util.generate(4), 'NNYN'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past()),
      util.generate(10), '14'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+'NY', util.generate(16), faker.internet.email(),
      new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
      ]
    },
    2: function() {
        return [`1${faker.name.firstName()}`,`K${faker.name.lastName()}`, faker.address.streetAddress(),
        faker.address.city(), faker.address.stateAbbr()+faker.address.zipCode()+util.generate(4),
        util.generate(34)+util.getFormattedDate(faker.date.past())+'EN'+util.generate(4), 'NNYN'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past()),
        util.generate(10), '14'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+'NY', util.generate(16), faker.internet.email(),
        new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
      },
    3: function() {
        return [`1${faker.name.firstName()}`,`J${faker.name.lastName()}`, faker.address.streetAddress(),
        faker.address.city(), faker.address.stateAbbr()+faker.address.zipCode()+util.generate(4),
        util.generate(34)+util.getFormattedDate(faker.date.past())+'EN'+util.generate(4), 'NNYN'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past()),
        util.generate(10), '14'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+'NY', util.generate(16),
        new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
    },
    4: function() {
        return [`1${faker.name.firstName()}`,`E${faker.name.lastName()}`, faker.address.streetAddress(),
        faker.address.city(), faker.address.stateAbbr()+faker.address.zipCode()+util.generate(4),
        util.generate(34)+util.getFormattedDate(faker.date.past())+'EN'+util.generate(4), 'NNYN'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past()),
        util.generate(10), '15'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+'NY', util.generate(16),
        new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
    },
    5: function() {
        return [`1${faker.name.firstName()}`,`S${faker.name.lastName()}`, faker.address.streetAddress(),
        faker.address.city(), faker.address.stateAbbr()+faker.address.zipCode()+util.generate(4),
        util.generate(34)+util.getFormattedDate(faker.date.past())+'EN'+util.generate(4), 'NNYN'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past()),
        util.generate(10), '14'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+'NY', util.generate(16),
        new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
    },
    6: function() {
        return [`1${faker.name.firstName()}`,`R${faker.name.lastName()}`, faker.address.streetAddress(),
        faker.address.city(), faker.address.stateAbbr()+faker.address.zipCode()+util.generate(4),
        util.generate(34)+util.getFormattedDate(faker.date.past())+'EN'+util.generate(4), 'NN',
        util.generate(10), '14'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+'NY', util.generate(16),
        faker.internet.email(),new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
    },
    7: function() {
        return [`1${faker.name.firstName()}`,`A${faker.name.lastName()}`, faker.address.streetAddress(),
        faker.address.city(), faker.address.stateAbbr()+faker.address.zipCode()+util.generate(4),
        util.generate(34)+util.getFormattedDate(faker.date.past())+'EN'+util.generate(4), 'NNNY',util.getFormattedDate(faker.date.past()),
        util.generate(10), '14'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+'NY', util.generate(16),
        faker.internet.email(),new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
    },
    8: function() {
        return [1, `${faker.name.firstName()}`,`${faker.name.firstName()}`, `M${faker.name.lastName()}`, faker.address.streetAddress(),
        faker.address.city(), faker.address.stateAbbr()+faker.address.zipCode()+util.generate(4),
        util.generate(34)+util.getFormattedDate(faker.date.past())+'EN'+util.generate(4), 'NNYN'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past()),
        util.generate(10), '14'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+'NY', util.generate(16),
        faker.internet.email(),new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
    },
    9: function() {
        return [`1${faker.name.firstName()}`, `A${faker.name.lastName()}`, faker.address.streetAddress(),
        faker.address.city(), faker.address.stateAbbr()+faker.address.zipCode()+util.generate(4),
        util.generate(34)+util.getFormattedDate(faker.date.past())+'EN'+util.generate(4), 'NNYN'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past()),
        util.generate(10), '14'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+'NY', util.generate(16)
        ,new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
    },
    10: function() {
        return [`1${faker.name.firstName()}`, `E${faker.name.lastName()}`, faker.address.streetAddress(),
        faker.address.city(), faker.address.stateAbbr()+faker.address.zipCode()+util.generate(4),
        util.generate(34)+util.getFormattedDate(faker.date.past())+'EN'+util.generate(4), 'NNYN'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past()),
        util.generate(10), 'YY14'+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+util.getFormattedDate(faker.date.past())+'NY', util.generate(16)
        ,faker.internet.email(),new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
    },
    11: function() {
        return [`3`, `${faker.name.firstName()}`, faker.address.streetAddress(), faker.address.city(), 
        faker.address.stateAbbr() + faker.address.zipCode() + util.generate(4) + util.generate(34) + util.getFormattedDate(faker.date.past()) + 'EN' + util.generate(4), 'NN', 
        util.generate(10), '02' + util.getFormattedDate(faker.date.past()) + util.getFormattedDate(faker.date.past()) + 'NY', util.generate(10) + 'I', 
        util.generate(16) + util.getFormattedDate(faker.date.past()), new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
        // 3, $BIZNAME,      $ADDRESS, $CITY, 
        // ${CA-STATE}, {$CA POSTAL CODE}${THIRTY FOUR DIGITS}{$mm}/{$dd}/${yyyy}EN{$four digits}, NN, 
        // {$ten digits}, 02{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}NY, {$ten digits}I, 
        // {$SIXTEEN DIGITS }{$mm}/{$dd}/${yyyy}, \d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==
      },
      12: function() {
        return [`3`, `${faker.name.firstName()}`, faker.address.streetAddress(), faker.address.city(), 
        faker.address.stateAbbr() + faker.address.zipCode() + util.generate(34) + util.getFormattedDate(faker.date.past()) + 'EN' + util.generate(4), 'NN', 
        util.generate(10), '02' + util.getFormattedDate(faker.date.past()) + util.getFormattedDate(faker.date.past()) + 'NY', util.generate(10) + 'C', 
        util.generate(6), util.generate(16) + util.getFormattedDate(faker.date.past()), new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
        // 3, $BIZNAME,      $ADDRESS, $CITY, ${CA-STATE}, {$CA POSTAL CODE}${THIRTY FOUR DIGITS}{$mm}/{$dd}/${yyyy}EN{$four digits}, NN, 
        // {$ten digits}, 02{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}NY, {$ten digits}C,
        // {$SIX DIGITS}, {$SIXTEEN DIGITS}{$mm}/{$dd}/${yyyy}, \d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==
      },
      13: function() {
        return [`3`, `${faker.name.firstName()}`, faker.address.streetAddress(), faker.address.city(), 
        faker.address.stateAbbr(), faker.address.zipCode() + util.generate(34) + util.getFormattedDate(faker.date.past()) + 'EN' + util.generate(4), 'NN', 
        util.generate(10), 'XE' + util.getFormattedDate(faker.date.past()) + util.getFormattedDate(faker.date.past()) + 'NY', 'I', 
        util.generate(16) + util.getFormattedDate(faker.date.past()), new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
        // 3, $BIZNAME,      $ADDRESS, $CITY,
        // ${CA-STATE}, {$CA POSTAL CODE}${THIRTY FOUR DIGITS}{$mm}/{$dd}/${yyyy}EN{$four digits}, NN, 
        // {$ten digits}, XE{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}NY, I,
        // {$SIXTEEN DIGITS}{$mm}/{$dd}/${yyyy}, \d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==
      },
      14: function() {
        return [`3`, `${faker.name.firstName()}`, faker.address.streetAddress(), faker.address.city(), faker.address.stateAbbr(),
        faker.address.zipCode() + util.generate(34) + util.getFormattedDate(faker.date.past()) + 'EN' + util.generate(4), 'NN', 
        util.generate(10), '08' + util.getFormattedDate(faker.date.past()) + util.getFormattedDate(faker.date.past()) + 'NY',
        util.generate(10) + 'S', util.generate(16) + util.getFormattedDate(faker.date.past()), new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
        // 3, $BIZNAME,      $ADDRESS, $CITY, ${CA-STATE},
        // {$CA POSTAL CODE}${THIRTY FOUR DIGITS}{$mm}/{$dd}/${yyyy}EN{$four digits}, NN, 
        // {$ten digits}, 08{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}NY, 
        // {$ten digits}S, {$SIXTEEN DIGITS}{$mm}/{$dd}/${yyyy}, \d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==
      },
      15: function() {
        return [`4${faker.name.firstName()}`, `M${faker.name.lastName()}`, faker.address.streetAddress(), faker.address.city(),
        faker.address.stateAbbr() + faker.address.zipCode() + util.generate(4), util.generate(34) + util.getFormattedDate(faker.date.past()) + 'EN' + util.generate(4), 
        'NN', util.generate(10), '17' + util.getFormattedDate(faker.date.past()) + util.getFormattedDate(faker.date.past()) + 'NY',
        util.generate(16) + util.getFormattedDate(faker.date.past()) + '1', new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
        // 4$FNAME, M$LNAME, $ADDRESS, $CITY, 
        // ${STATE}${ZIP_CODE+PLUS4}, ${THIRTY FOUR DIGITS}{$mm}/{$dd}/${yyyy}EN{$four digits},
        // NN, {$ten digits}, 17{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}NY,
        // {$SIXTEEN DIGITS}{$mm}/{$dd}/${yyyy}1, \d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==
      },
      16: function() {
        return [`5`, `${faker.name.firstName()}`, faker.address.streetAddress(), faker.address.city(),
        faker.address.stateAbbr() + faker.address.zipCode() + util.generate(4), util.generate(34) + util.getFormattedDate(faker.date.past()) + 'EN' + util.generate(4), 'NN', 
        util.generate(10), '03' + util.getFormattedDate(faker.date.past()) + util.getFormattedDate(faker.date.past()) + 'NY', 'C',
        util.generate(8), util.generate(16) + util.getFormattedDate(faker.date.past()), new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
        // 5, $BIZNAME,      $ADDRESS, $CITY,
        // ${STATE}${ZIP_CODE+PLUS4}, ${THIRTY FOUR DIGITS}{$mm}/{$dd}/${yyyy}EN{$four digits}, NN,
        // {$ten digits}, 03{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}NY, C, 
        // {$EIGHT DIGITS}, {$SIXTEEN DIGITS}{$mm}/{$dd}/${yyyy}, \d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==
      },
      17: function() {
        return [`2`, `${faker.name.firstName()}`, faker.address.streetAddress(), faker.address.city(), 'ON',
        faker.address.zipCode() + util.generate(34) + util.getFormattedDate(faker.date.past()) + 'EN' + util.generate(4), 'NN', 
        util.generate(10), '19' + util.getFormattedDate(faker.date.past()) + util.getFormattedDate(faker.date.past()) + 'NY', 'I',
        util.generate(8), util.generate(16), new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
        // 2, $BIZNAME,      $ADDRESS, $CITY, ON, 
        // {$CA POSTAL CODE}${THIRTY FOUR DIGITS}{$mm}/{$dd}/${yyyy}EN{$four digits}, NN, 
        // {$ten digits}, 19{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}NY, I, 
        // {$EIGHT DIGITS}, {$SIXTEEN DIGITS}, \d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==
      },
      18: function() {
        return [`2`, `${faker.name.firstName()}`, faker.address.streetAddress(), faker.address.city(),
        faker.address.stateAbbr() + faker.address.zipCode() + util.generate(4), util.generate(34) + util.getFormattedDate(faker.date.past()) + 'EN' + util.generate(4), 'NN', 
        util.generate(10), '19' + util.getFormattedDate(faker.date.past()) + util.getFormattedDate(faker.date.past()) + 'NY', 'I',
        util.generate(8), util.generate(16), new RandExp(/\d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==/).gen()
        ]
        // 2, $BIZNAME,      $ADDRESS, $CITY,
        // ${STATE}${ZIP_CODE+PLUS4}, ${THIRTY FOUR DIGITS}{$mm}/{$dd}/${yyyy}EN{$four digits}, NN, 
        // {$ten digits}, 19{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}{$mm}/{$dd}/${yyyy}NY, I, 
        // {$EIGHT DIGITS}, {$SIXTEEN DIGITS}, \d{1,4}\.\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\/+]{44}==
      }
  
  }