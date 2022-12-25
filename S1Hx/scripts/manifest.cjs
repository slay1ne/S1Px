// @ts-check
"use strict";
const { Formatter, CommentPolicy, FracturedJsonOptions, EolStyle } = require("fracturedjsonjs");
const fs = require("fs");
const path = require("path");
const { jsonc } = require("jsonc");
const version = require("../package.json")["version"];

Manifest(3, "chromium");
Manifest(2, "firefox");

function Manifest (Mver, distro) {

    const manifestSrcPath = path.join(__dirname, "..", distro, "manifest.jsonc");
    const manifestDistPath = path.join(__dirname, "..", "dist", distro, "manifest.json");


    let manifest = jsonc.parse(fs.readFileSync(manifestSrcPath, "utf8"));
    manifest["version"] = version;
    manifest["manifest_version"] = Mver;
    manifest["name"] = "Slay.One Hacking Extension | S1Hx";
    manifest["icons"] = {
        "16": "assets/x16.png",
        "48": "assets/x48.png",
        "128": "assets/x128.png"
    };



    const options = new FracturedJsonOptions();
    options.MaxTotalLineLength = 80;
    options.MaxInlineComplexity = 1;
    options.JsonEolStyle = EolStyle.Lf;
    options.CommentPolicy = CommentPolicy.Remove;

    const formatter = new Formatter();
    formatter.Options = options;


    const newManifest = formatter.Serialize(manifest);


    // @ts-expect-error
    fs.writeFileSync(manifestDistPath, newManifest);

}