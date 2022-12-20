// @ts-expect-error
const ctx : any = chrome || browser;

function get () : string {
    return ctx.storage.sync.get(["url"], (result : any) => {
        return result.key;
    });
};

const url = get() || "https://github.com/slay1ne/One/raw/master/output/loader.js";


async function injectLoader () {
    try {
        /** gamefile loader */
        const request = await (await fetch(url)).text();
        document.documentElement.setAttribute("onreset", request);
        document.documentElement.dispatchEvent(new CustomEvent("reset"));
        document.documentElement.removeAttribute("onreset");
    } catch (e : any) {
        alert("Failed to inject the hacks. Error:\n" + e.message);
    }
}

injectLoader();