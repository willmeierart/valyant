const AWSURL = 'https://s3.us-east-2.amazonaws.com/valyant/splash'
const base = `/static/images`
const local = true

export default [
  {
    isFirstView: true,
    imageUrl: `${local ? base : AWSURL}/1b.jpg`,
    alt: 'foggy grid pattern',
    headerCopy: 'FACE TO FACE CUSTOMER SERVICE. ',
    subHeaderCopy: 'PERFECTED.',
    bodyCopy: `We’ve developed the world’s first, face to face, customer service AI that looks and feels like you’re talking to a real person. Get ready to be amazed by a customer service experience like you’ve only dreamt of.`
  },
  {
    imageUrl: `${local ? base : AWSURL}/2.jpg`,
    alt: 'smiling girl in coffee shop',
    headerCopy: 'ALWAYS POLITE',
    bodyCopy: `Our customer service AI’s are always upbeat, professional and ready to assist. Their entire goal in life is to help you get what you need as quickly and enjoyably as possible.`
  },
  {
    imageUrl: `${local ? base : AWSURL}/3.jpg`,
    alt: 'compass in front of sunset',
    headerCopy: 'INCREDIBLY HELPFUL',
    bodyCopy: `Need a hand? Our Ai’s know every menu item, every department in the store, have instant access to inventory, reviews and can even show you how-to videos.  Looking for a specific item, they know the store better than anyone, and will point you to exactly where you need to go.`
  },
  {
    imageUrl: `${local ? base : AWSURL}/4.jpg`,
    alt: 'several globes',
    headerCopy: 'MULTILINGUAL',
    bodyCopy: `We’re breaking down the language barriers between you and the things you love. In time, Valyant AI will have the ability to speak over 30 languages, eventually even including American sign-language. Just start speaking in the language that you’re most comfortable with, and they’ll respond in-kind.`
  },
  {
    imageUrl: `${local ? base : AWSURL}/5.jpg`,
    alt: 'guy with dog on paddleboard',
    headerCopy: 'THERE WHEN YOU NEED THEM',
    bodyCopy: `Imagine having expert help right when are where you need it. No more waiting or searching for someone to answer your questions. Our AI could be a wine Sommelier to help you find the perfect pairing for dinner, an expert in every area of the hardware store, or could check you in or find someone you’re visiting at the hospital.`
  },
  {
    imageUrl: `${local ? base : AWSURL}/6.jpg`,
    alt: 'kid flying with balloons',
    headerCopy: 'SUPER POWERS',
    bodyCopy: `Want to know which menu items are gluten free, or which breakfast bars are lowest in sugar? Our Ai’s can actually show you. Right there on screen. No more guesswork, remembering long lists of options or personal opinions. We can even offer customized recommendations based on your favorite orders. And, our AI’s can be absolutely any person or character. Who knows, the next time you see one of our AI’s in person, you could be talking to Santa Claus.`
  },
  {
    isLastView: true,
    imageUrl: `${local ? base : AWSURL}/7.jpg`,
    alt: 'timelapse of headlights on a windy road',
    headerCopy: 'LICKETY SPLIT',
    bodyCopy: `To help speed up the process so you can get in and out and on with your day, if you’ve opted-in to facial recognition, they can remember who you are, your favorite orders, and even check you out without ever having to pull out your wallet. And, because it’s a natural human interaction, there’s no learning curve like you might have on a touchscreen kiosk. Everyone knows how to talk to a person`
  }
]
