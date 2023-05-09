require('dotenv').config()

const GetCss = async (style, className) => {
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
          content: `turns this to a css with this className: ${className}. give me just a css not any further explanation: ${style}`
        }]
      })g
    })
    const res = await data.json()
    return res?.choices[0]?.message?.content
  } catch (ex) {
    console.log('ex >>', `something went wrong: ${ex}`)
  }
}

module.exports = GetCss
