require('dotenv').config()

const HttpCall = async (style) => {
  try {
    const data = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'user',
          content: `turns this to a css give me just a css not any further explanation: ${style}`
        }]
      })
    })
    const res = await data.json()
    return res?.choices[0]?.message?.content
  } catch (ex) {
    console.log('ex >>', `something went wrong: ${ex}`)
  }
}

module.exports = HttpCall
