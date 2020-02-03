'use strict';

const expect = require('chai').expect;

const charWidth = require('./index.js');

suite('util', function() {
    test('ascii', function() {
        let w = charWidth.strWidth("0123456789");
        expect(w).to.equal(10);
    });

    test('ascii+Chinese', function() {
        let w = charWidth.strWidth("0123456789+中文字符");
        expect(w).to.equal(19);
    });

    test('ascii+w3', function() {
        let w = charWidth.strWidth("0123456789+\u0c8a");
        expect(w).to.equal(14);
    });

    test('ascii+w4', function() {
        let w = charWidth.strWidth("0123456789+\u102a");
        expect(w).to.equal(15);
    });

    test('ascii+w5', function() {
        let w = charWidth.strWidth("0123456789+\u0bcc");
        expect(w).to.equal(16);
    });

    test('ascii+w12', function() {
        let w = charWidth.strWidth("0123456789+\ufdfd");
        expect(w).to.equal(23);
    });
});

suite('performance', function() {
    this.timeout(10000);

    let s = "";
    let c = "";

    suiteSetup(function() {
        s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-=_+{}{}:{}\\|'";
        do {
            s += s;
        } while (s.length < 10 * 1024 * 1024);

        c = "白日依山尽黄河入海流欲穷千里目更上一层楼";
        do {
            c += c;
        } while (c.length < 10 * 1024 * 1024);
    });

    test('performance-ascii', function() {
        console.log(s.length);
        let w = charWidth.strWidth(s);
        expect(w).to.equal(s.length);
    });

    test('performance-Chinese', function() {
        console.log(c.length);
        let w = charWidth.strWidth(c);
        expect(w).to.least(c.length * 2);
    });
});

