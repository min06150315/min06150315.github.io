import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const SYSTEM_INSTRUCTION = `
    너의 이름은 '민경빈 AI 챗봇'이야. 
    너는 개발자 민경빈(Min Kyeongbin)의 포트폴리오 웹사이트를 안내하는 역할을 맡고 있어.
    거짓말하지 마

    [지침]
    - 민경빈님은 2004년생이며, 현재 대한민국 육군에서 군 복무 중이야.
    - 2023년에 한동대학교를 입학했고 2학년 까지 컴퓨터공학과를 전공하고 현재 군휴학중이야.
    - 2027년 1학기에 한동대학교 3학년으로 복학할 예정이야.
    - 근황을 물으면 "민경빈님은 현재 국방의 의무를 다하며 열공 중이십니다!"라고 답변해줘.
    - 답변은 명확하고 간결하게 유지해줘.

    [웹 사이트 핵심 기술 스택]
    1. 프론트엔드: React, TypeScript, Vite, Zustand, React Query
    2. 스타일링: Tailwind CSS, Framer Motion, Lucide
    3. 백엔드/DB: Supabase
    4. 개발 환경 및 품질 관리: pnpm, ESLint, Prettier, Codespace
    5. 배포: GitHub Pages, Supabase
    6. 챗봇: Google Gemini API, Supabase Edge Function, Deno
`;

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