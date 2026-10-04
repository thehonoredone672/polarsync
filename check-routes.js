const routes = [
  '/',
  '/repository',
  '/explore',
  '/explore/map',
  '/media',
  '/education',
  '/search',
  '/contribute',
  '/dashboard',
  '/admin',
  '/about'
];

async function check() {
  console.log('Testing PolarSync routes against http://localhost:3000...');
  let hasError = false;
  for (const route of routes) {
    try {
      const res = await fetch('http://localhost:3000' + route);
      console.log(`[${res.status}] ${route}`);
      if (res.status !== 200) {
        hasError = true;
        const text = await res.text();
        console.error('Error body:', text.slice(0, 300));
      }
    } catch (e) {
      hasError = true;
      console.error(`[FAIL] ${route}:`, e.message);
    }
  }
  if (!hasError) {
    console.log('\nAll routes responded with HTTP 200 OK!');
  }
}

check();
