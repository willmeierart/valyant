const AWSURL = 'https://s3.us-east-2.amazonaws.com/valyant/splash'
const base = `/static/images`
const local = true

export default [
  {
    isFirstView: true,
    imageUrl: `${local ? base : AWSURL}/Valyant01`,
    nextImageUrl: `${local ? base : AWSURL}/Valyant02`,
    alt: 'foggy angular architecture pattern',
    headerCopy: 'THE FUTURE OF CUSTOMER SERVICE IS FINALLY HERE.',
    subHeaderCopy: '',
    bodyCopy: `We’ve developed the world’s first, face to face, customer service AI that looks and feels like you’re talking to a real person. Get ready to be amazed by a customer service experience unlike anything you’ve ever experienced.`
  },
  {
    imageUrl: `${local ? base : AWSURL}/Valyant02`,
    nextImageUrl: `${local ? base : AWSURL}/Valyant03`,
    alt: 'girl talking to AI illustration',
    headerCopy: 'ALWAYS POLITE',
    bodyCopy: `Our customer service AIs are always upbeat, professional and ready to assist. Their entire goal in life is to help you as quickly and enjoyably as possible.`
  },
  {
    imageUrl: `${local ? base : AWSURL}/Valyant03`,
    nextImageUrl: `${local ? base : AWSURL}/Valyant04`,
    alt: 'AI displaying helpful items illustration',
    headerCopy: 'INCREDIBLY HELPFUL',
    bodyCopy: `Need a hand? Our AIs know every menu item, every department in the store, have instant access to inventory, reviews and can even show you how-to videos.  Looking for a specific item, they know the store better than anyone, and will point you to exactly where you need to go.`
  },
  {
    imageUrl: `${local ? base : AWSURL}/Valyant04`,
    nextImageUrl: `${local ? base : AWSURL}/Valyant05`,
    alt: 'AI speaking several languages illustration',
    headerCopy: 'MULTILINGUAL',
    bodyCopy: `We’re breaking down language barriers between you and the things you love. In time, Valyant AI will have the ability to speak over 30 languages, including American sign-language. Just start speaking in the language you’re most comfortable with, and they’ll respond in-kind.`
  },
  {
    imageUrl: `${local ? base : AWSURL}/Valyant05`,
    nextImageUrl: `${local ? base : AWSURL}/Valyant06`,
    alt: 'store layout with many AIs illustration',
    headerCopy: 'THERE WHEN YOU NEED THEM',
    bodyCopy: `Imagine having expert help exactly when you need it. No more waiting or searching for someone to answer your questions. Our AIs could take your drive-thru order, be a wine Sommelier to help you find the perfect pairing for dinner, an expert in every area of the hardware store, or check you in for a hospital visit.`
  },
  {
    imageUrl: `${local ? base : AWSURL}/Valyant06`,
    nextImageUrl: `${local ? base : AWSURL}/Valyant07`,
    alt: 'car at drive-thru',
    headerCopy: 'SUPPORT IN EVERY AREA',
    bodyCopy: `Our AIs work everywhere you need them. We can easily integrate our voice-based assistants in call-ahead phone systems, restaurant drive-throughs, and mobile apps. They're always happy to support you at every touchpoint, anytime and anywhere.`
  },
  {
    imageUrl: `${local ? base : AWSURL}/Valyant07`,
    nextImageUrl: `${local ? base : AWSURL}/Valyant08`,
    alt: 'AI as Santa illustration',
    headerCopy: 'SUPER POWERS',
    bodyCopy: `Want to know which menu items are gluten free, or which breakfast bars are lowest in sugar? Our AIs can actually show you. Right there on screen. No more guesswork, remembering long lists of options or personal opinions. We can even offer customized recommendations based on your favorite orders. And, our AIs can be absolutely any person or character. Who knows, the next time you see one of our AIs in person, you could be talking to Santa Claus.`
  },
  {
    isLastView: true,
    imageUrl: `${local ? base : AWSURL}/Valyant08`,
    nextImageUrl: `${local ? base : AWSURL}/Valyant01`,
    alt: 'AI recognizing customer face illustration',
    headerCopy: 'LICKETY SPLIT',
    bodyCopy: `If you’ve opted-in to facial recognition, they can remember who you are, your favorite orders, and even check you out without ever having to pull out your wallet. And, because it’s a natural human interaction, there’s no learning curve like you might have on a touchscreen kiosk. Everyone knows how to talk to a person.`
  }
]
