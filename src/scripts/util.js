export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function trimAddress(address) {
  if (!address) {
    return '';
  }

  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
}

export function getUsefulError(e) {
  //console.log(typeof e)
  if (typeof e === "object") {
    const msg = e.message;
    e = msg;

    if (msg.toString().includes("'")) {
      const start = msg.indexOf("'");
      const end = msg.lastIndexOf("'");
      const jsonString = msg.substring(start + 1, end);
      //console.log(jsonString)
      const json = JSON.parse(jsonString);

      return json.value.data.message;
    }
  }

  let err = e.toString();
  if (err.startsWith("Error: ")) {
    err = err.substring(7);
  }

  return err;
}

export function reduceMotionEnabled() {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return !mediaQuery || mediaQuery.matches;
}

window.onload = function () {
  const storedHash = localStorage.getItem('hash');

  if (!storedHash || storedHash === undefined || storedHash === null) {
    return;
  }

  try {
    window.scrollTo({
      top: document.getElementById(storedHash).offsetTop, behavior: 'smooth'
    })
  } catch (e) {

  }

  localStorage.setItem('hash', undefined);
}

export function goto(btn) {
  const currentPage = window.location.pathname;
  const page = btn.page;
  const target = btn.target;

  if (`${page}/${target}`.trim() === `${window.location.pathname.trim()}/`) {
    return;
  }

  if (!page.startsWith('/')) {
    window.open(page, '_blank');
    return;
  }

  if (page !== currentPage) {
    localStorage.removeItem('hash');

    if (target) {
      const hash = target.replace('#', '');

      if (hash) {
        localStorage.setItem('hash', hash);
      }
    }

    window.open(page, '_self');
  } else {
    if (target === '') {
      window.open('/', '_self');
      return;
    }

    const hash = target.replace('#', '');
    window.scrollTo({
      top: document.getElementById(hash).offsetTop, behavior: 'smooth'
    })
  }
}
