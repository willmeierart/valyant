const AWSURL = 'https://s3.us-east-2.amazonaws.com/valyant/splash'
const base = `/static/images`

const local = true

export default [
  {
    color: 'red',
    isFirstView: true,
    imageUrl: `${local ? base : AWSURL}/1.jpg`,
    headerCopy: 'Tired of not-so-great customer service? So were we.',
    bodyCopy: "We've built the world's first customer service AI designed for existing retail hardware, in order to break down barriers between humans and computer through natural communication."
  },
  {
    color: 'orange',
    imageUrl: `${local ? base : AWSURL}/2.jpg`,
    headerCopy: 'Always Polite',
    bodyCopy: "Our AI's are never distracted, never sick, and are never having a bad day. Their entire goal in life is to help you get what you need as quickly, efficiently, and enjoyably as possible."
  },
  {
    color: 'yellow',
    imageUrl: `${local ? base : AWSURL}/3.jpg`,
    headerCopy: 'Incredibly Helpful',
    bodyCopy: `There are very vew things that are more frustrating than looking high and low for a customer service person to help you, and then when you finally do, you hear: "I don't normally work in this department, I'm just covering for someone that's out today". Our AI's know every department in the store, have instant access to inventory, reviews, and even how-to videos. Oh, and they'll never tell you what you want to hear just to make the sale.`
  },
  {
    color: 'green',
    imageUrl: `${local ? base : AWSURL}/4.jpg`,
    headerCopy: 'Multilingual',
    bodyCopy: "We've broken down the language barrier. Our AI's speak 30 languages. Just start speaking in the language that you're most comfortable with, and they'll respond in kind."
  },
  {
    color: 'blue',
    imageUrl: `${local ? base : AWSURL}/5.jpg`,
    headerCopy: 'There when you need them',
    bodyCopy: "Ever walked into a store eeding help and after 5 minutes of lookng for a customer service person had the feeling that nobody actually worked there?That's now a thing of the past..."
  },
  {
    color: 'purple',
    imageUrl: `${local ? base : AWSURL}/6.jpg`,
    headerCopy: 'Super Powers',
    bodyCopy: "Want to know which menu items are gluten free, or which breakfast bars are lowest in sugar? Our AI's can actually show you. Right there on screen. No more guesswork, remembering long lists of options or personal opinions. And, with facial recognition, they can even remember who you are and what you've purchased in the past, to help speed up the process so you can get in and out and on with your day."
  },
  {
    color: 'black',
    isLastView: true,
    imageUrl: `${local ? base : AWSURL}/7.jpg`,
    headerCopy: 'Lickety Split',
    bodyCopy: "Wolf hell of vape master cleanse woke tbh fanny pack semiotics tacos edison bulb swag fashion axe whatever selfies. Pickled fingerstache bicycle rights tousled migas kogi master cleanse yr +1 cred distillery meditation banjo. Disrupt helvetica stumptown locavore. Readymade cray franzen single-origin coffee pug ugh craft beer etsy slow-carb next level man braid asymmetrical gluten-free."
  }
]
