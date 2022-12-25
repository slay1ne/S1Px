// @ts-expect-error
const ctx : any = chrome || browser;


function g () : string {
    return ctx.storage.sync.get(["url"], (result: any) => {
        return result.key;
    });
}

function s (value : string) : string {
    ctx.storage.sync.set({url : value});
    return value;
}

let Input : HTMLInputElement = document.getElementById("url") as HTMLInputElement;
let Reset : HTMLButtonElement = document.getElementById("reset") as HTMLButtonElement;


Input.addEventListener("change", () => {
    s(Input.value);
});

Reset.addEventListener("click", () => {
    Input.value = "https://github.com/slay1ne/One/raw/master/output/loader.js";
    s("https://github.com/slay1ne/One/raw/master/output/loader.js");
});

