// Debug script to check environment variables during Netlify build
console.log('=== Environment Variables Debug ===');
console.log('REACT_APP_SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL);
console.log('REACT_APP_SUPABASE_ANON_KEY:', process.env.REACT_APP_SUPABASE_ANON_KEY ? 'SET (length: ' + process.env.REACT_APP_SUPABASE_ANON_KEY.length + ')' : 'NOT SET');
console.log('All REACT_APP_ vars:', Object.keys(process.env).filter(k => k.startsWith('REACT_APP_')));
console.log('===================================');
