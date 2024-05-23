import './index.css'
import './micman.ts'

(async () => {
  await Promise.all([
    import('./app-one'),
    import('./app-two')
  ])
  window.start();
})();