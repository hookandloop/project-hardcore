import { xssUtils } from '../../../src/utils/xss';

describe('Xss Utils', () => {
  it('Should white list specific html tags', () => {
    let result = xssUtils.stripTags('<p>Test</p> <br /><b>Test</b> <i>Test</i>', '<i><b>');

    expect(result).toEqual('Test <b>Test</b> <i>Test</i>');

    result = xssUtils.stripTags('<p>Test <img src="test.png" onmouseover="someFunction()">Test <i>Test</i></p>', '<p>');

    expect(result).toEqual('<p>Test Test Test</p>');

    result = xssUtils.stripTags('<a href=\'http://test.test.net\'>Test Test Test</a>', '<a>');

    expect(result).toEqual('<a href=\'http://test.test.net\'>Test Test Test</a>');

    result = xssUtils.stripTags('1 < 5 5 > 1');

    expect(result).toEqual('1 < 5 5 > 1');

    result = xssUtils.stripTags('1 <br/> 1');

    expect(result).toEqual('1  1');

    result = xssUtils.stripTags('1 <br/> 1', '<br>');

    expect(result).toEqual('1 <br/> 1');

    result = xssUtils.stripTags('1 <br/> 1', '<br><br/>');

    expect(result).toEqual('1 <br/> 1');

    result = xssUtils.stripTags('Test <svg/onload=alert(1)> Test', '<br><br/>');

    expect(result).toEqual('Test  Test');

    result = xssUtils.stripTags('Test <script>alert()</script> Test', '<br><br/>');

    expect(result).toEqual('Test alert() Test');

    result = xssUtils.stripTags('Test <script>alert()</script> Test', '<br><br/>');

    expect(result).toEqual('Test alert() Test');

    result = xssUtils.stripTags('Test <s c r i p t>alert()</s c r i p t> Test', '<br><br/>');

    expect(result).toEqual('Test alert() Test');

    result = xssUtils.stripTags('"><script>give_me_your_credit_card()</script>', '<br><br/>');

    expect(result).toEqual('">give_me_your_credit_card()');

    // Number test
    expect(xssUtils.stripTags(6)).toEqual(6);
  });

  it('Should remove all html tags', () => {
    let result = xssUtils.stripHTML('<p>Test</p> <br /><b>Test</b> <i>Test</i>');

    expect(result).toEqual('Test Test Test');

    result = xssUtils.stripHTML('<p>Test <img src="test.png" onmouseover="someFunction()">Test <i>Test</i></p>');

    expect(result).toEqual('Test Test Test');

    result = xssUtils.stripHTML('<a href=\'http://test.test.net\'>Test Test Test</a>');

    expect(result).toEqual('Test Test Test');

    result = xssUtils.stripHTML('1 < 5 5 > 1');

    expect(result).toEqual('1  1');

    result = xssUtils.stripHTML('1 <br/> 1');

    expect(result).toEqual('1  1');

    result = xssUtils.stripHTML('1 <br/> 1');

    expect(result).toEqual('1  1');

    result = xssUtils.stripHTML('1 <br/> 1');

    expect(result).toEqual('1  1');

    result = xssUtils.stripHTML('Test <svg/onload=alert(1)> Test');

    expect(result).toEqual('Test  Test');

    result = xssUtils.stripHTML('Test <script>alert()</script> Test');

    expect(result).toEqual('Test alert() Test');

    result = xssUtils.stripHTML('Test <s c r i p t>alert()</s c r i p t> Test');

    expect(result).toEqual('Test alert() Test');
  });

  it('Should santize html tags', () => {
    let result = xssUtils.sanitizeHTML('<strong>hello world</strong>');

    expect(result).toEqual('<strong>hello world</strong>');

    result = xssUtils.sanitizeHTML('<img src=x onerror=alert(\'img\') />');

    expect(result).toEqual('<img src=x>');

    result = xssUtils.sanitizeHTML('console.log(\'hello world\')');

    expect(result).toEqual('');

    result = xssUtils.sanitizeHTML('console.log(\'hello world\');');

    expect(result).toEqual('');

    result = xssUtils.sanitizeHTML('<script>alert(\'hello world\')</script>');

    expect(result).toEqual('');

    result = xssUtils.sanitizeHTML('<script><script>alert(\'hello world\')</script></script>');

    expect(result).toEqual('');
  });

  it('Should force alphanumber values', () => {
    let result = xssUtils.ensureAlphaNumeric('<strong>hello world</strong>');

    expect(result).toEqual('helloworld');

    result = xssUtils.ensureAlphaNumeric('test-module-1');

    expect(result).toEqual('test-module-1');

    result = xssUtils.ensureAlphaNumeric('<a href="x">test-module-1</a>');

    expect(result).toEqual('test-module-1');

    result = xssUtils.ensureAlphaNumeric('test-module-1!@%^@!^&@%^&@!&^%@!%^&!@%^&^@%!&');

    expect(result).toEqual('test-module-1');
    expect(xssUtils.ensureAlphaNumeric(6)).toEqual(6);
  });

  it('Should ensure local urls', () => {
    expect(xssUtils.isUrlLocal('http://test.com')).toEqual(false);

    // "/" or "/foo" but not "//" or "/\"
    expect(xssUtils.isUrlLocal('/')).toEqual(true);
    expect(xssUtils.isUrlLocal('/test.html')).toEqual(true);
    expect(xssUtils.isUrlLocal('/test')).toEqual(true);
    expect(xssUtils.isUrlLocal('/test/test.html')).toEqual(true);
    expect(xssUtils.isUrlLocal('//')).toEqual(false);
    expect(xssUtils.isUrlLocal('//test')).toEqual(false);
    expect(xssUtils.isUrlLocal('/\test/test.html')).toEqual(true);

    // "~/" or "~/foo"
    expect(xssUtils.isUrlLocal('~/')).toEqual(true);
    expect(xssUtils.isUrlLocal('~/test.html')).toEqual(true);
    expect(xssUtils.isUrlLocal('~//test/test.html')).toEqual(true);

    // "#" or "#foo"
    expect(xssUtils.isUrlLocal('#')).toEqual(true);
    expect(xssUtils.isUrlLocal('#test')).toEqual(true);
  });
});
