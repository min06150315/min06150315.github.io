import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SYSTEM_INSTRUCTION } from './constant.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { prompt } = await req.json()
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    
    // GEMINI FLASH LITE 사용
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`


    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (data.error) {
    let friendlyMessage = "잠시 후 다시 시도해 주세요!";
    
    if (data.error.message.includes("quota")) {
      friendlyMessage = "오늘 대화 한도가 끝났어요.";
    } else if (data.error.code === 400) {
      friendlyMessage = "잘 못 알아들었어요. 조금만 쉽게 말해줄래요?";
    }

    return new Response(JSON.stringify({ 
      error: true, 
      reply: friendlyMessage 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  }

    return new Response(JSON.stringify({ reply: data.candidates[0].content.parts[0].text }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
  
  } catch (e) {
    console.error("Critical Error:", e);
    return new Response(JSON.stringify({ 
      error: true, 
      reply: `서버 내부 오류가 발생했습니다: ${e.message}` 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  }
})