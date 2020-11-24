# data-generator
# Welcome to the data-generator

Use this utility to generate large amounts of fake data in CSV format. You can also use this to subsequently insert the generated data into an already existing bigquery table. 

# Pre-requisites- 
NodeJS v15.0.1

# How to use - 
1. Clone the repository on your machine
2. Run `npm install`
3. There are two exampleSchemas provided in the repository
*One of the schema is a data generation tool specific schema and the other is a schema needed to create the bigquery table.*
4. Run the tool by `node fakeData.js exampleDataGenSchema.json 1000`
*Here 1000 stands for the number of rows you want to create*
5. The tool will then show a prompt saying, *Do you also want to insert these rows in bigquery? (choices: y/n)*
6. If you choose 'y', the tool will then again prompt you to provide a dataset and table name separated by a comma.
7. The tool will then insert all the generated rows into the BQ table.

# Creating the data generation tool specific schema
1. You will have to create a new schema json file. This schema is almost similar to the Bigquery schema, with a few key differnces.
2. You may need to specify types and subtypes of data depending on the type of data being generated- 
3. For example, if you just want a simple string to be generated, use something like the following - 
~~~~
{
"mode": "NULLABLE",
"name": "FIRSTTIME_PURCHASER",
"type": "STRING"
  }
~~~~
4. If you want to generate a random choice between multiple values, use something like the following - 
~~~~
{
"mode": "NULLABLE",
"name": "CORE_FIELD_INDICATOR",
"type": "randchoice",
"choices": ["Y", "B"]
}
~~~~
5. If you have a default value for the field, use something like the following - 
~~~~
{
"mode": "NULLABLE",
"name": "PRODUCTTYPE",
"type": "constant",
"defaultVal": "product"
}
~~~~
6. If you want to generate data based on a regex, use something like the following - 
~~~~
{
"mode": "NULLABLE",
"name": "HASH_ACCT_NBR",
"type": "regex",
"subType": "/\\d{1,4}\\.\\d{2}NMTMxMDAwNjkwMA[a-zA-Z0-9\\/+]{44}==/"
}
~~~~
7. If you want to generate random numbers, use something like the following - 
~~~~
{
"mode": "NULLABLE",
"name": "numbers",
"type": "numbers"
}
~~~~
8. Now on to the most powerful feature. You can generate any type of data from the following fields, by specifying a type and a subtype. Following is an example for first name- 
~~~~
{
"mode": "NULLABLE",
"name": "FSTNAME",
"type": "name",
"subType": "firstName"
}
  ~~~~
9. For dates, You can use something like - 
~~~~
{
"mode": "NULLABLE",
"name": "dates",
"type": "date"
}
~~~~

Following is a list of types and subtypes you can choose to generate your data - 
* address
  * zipCode
  * zipCodeByState
  * city
  * cityPrefix
  * citySuffix
  * streetName
  * streetAddress
  * streetSuffix
  * streetPrefix
  * secondaryAddress
  * county
  * country
  * countryCode
  * state
  * stateAbbr
  * latitude
  * longitude
  * direction
  * cardinalDirection
  * ordinalDirection
  * nearbyGPSCoordinate
  * timeZone
* commerce
  * color
  * department
  * productName
  * price
  * productAdjective
  * productMaterial
  * product
  * productDescription
* company
  * suffixes
  * companyName
  * companySuffix
  * catchPhrase
  * bs
  * catchPhraseAdjective
  * catchPhraseDescriptor
  * catchPhraseNoun
  * bsAdjective
  * bsBuzz
  * bsNoun
* database
  * column
  * type
  * collation
  * engine
* date
  * past
  * future
  * between
  * recent
  * soon
  * month
  * weekday
* fake
* finance
  * account
  * accountName
  * routingNumber
  * mask
  * amount
  * transactionType
  * currencyCode
  * currencyName
  * currencySymbol
  * bitcoinAddress
  * litecoinAddress
  * creditCardNumber
  * creditCardCVV
  * ethereumAddress
  * iban
  * bic
  * transactionDescription
* git
  * branch
  * commitEntry
  * commitMessage
  * commitSha
  * shortSha
* hacker
  * abbreviation
  * adjective
  * noun
  * verb
  * ingverb
  * phrase
* helpers
  * randomize
  * slugify
  * replaceSymbolWithNumber
  * replaceSymbols
  * replaceCreditCardSymbols
  * repeatString
  * regexpStyleStringParse
  * shuffle
  * mustache
  * createCard
  * contextualCard
  * userCard
  * createTransaction
* image
  * image
  * avatar
  * imageUrl
  * abstract
  * animals
  * business
  * cats
  * city
  * food
  * nightlife
  * fashion
  * people
  * nature
  * sports
  * technics
  * transport
  * dataUri
  * lorempixel
  * unsplash
  * lorempicsum
* internet
  * avatar
  * email
  * exampleEmail
  * userName
  * protocol
  * url
  * domainName
  * domainSuffix
  * domainWord
  * ip
  * ipv6
  * userAgent
  * color
  * mac
  * password
* lorem
  * word
  * words
  * sentence
  * slug
  * sentences
  * paragraph
  * paragraphs
  * text
  * lines
* music
  * genre
* name
  * firstName
  * lastName
  * findName
  * jobTitle
  * gender
  * prefix
  * suffix
  * title
  * jobDescriptor
  * jobArea
  * jobType
* phone
  * phoneNumber
  * phoneNumberFormat
  * phoneFormats
* random
  * number
  * float
  * arrayElement
  * arrayElements
  * objectElement
  * uuid
  * boolean
  * word
  * words
  * image
  * locale
  * alpha
  * alphaNumeric
  * hexaDecimal
* system
  * fileName
  * commonFileName
  * mimeType
  * commonFileType
  * commonFileExt
  * fileType
  * fileExt
  * directoryPath
  * filePath
  * semver
* time
  * recent
* unique
* vehicle
  * vehicle
  * manufacturer
  * model
  * type
  * fuel
  * vin
  * color
