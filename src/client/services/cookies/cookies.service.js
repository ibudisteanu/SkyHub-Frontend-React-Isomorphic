/*
 TUTORIAL BASED on http://stackoverflow.com/questions/34298133/angular-2-cookies
 */

export class CookiesService {

    static getSessionCookie(){
        return this.readCookie2('sessionId');
    }

    static readCookie(cookieName) {
        var theCookie=" "+window.document.cookie;
        var ind=theCookie.indexOf(" "+cookieName+"=");
        if (ind==-1) ind=theCookie.indexOf(";"+cookieName+"=");
        if (ind==-1 || cookieName=="") return "";
        var ind1=theCookie.indexOf(";",ind+1);
        if (ind1==-1) ind1=theCookie.length;
        return theCookie.substring(ind+cookieName.length+2,ind1);
    }

    static readCookie2(a) {
        var b = window.document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }

    static deleteCookie(name) {
        console.log('deleting cookie');
        this.setCookie(name, '', -1);
    }

    static setCookie(name , value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

}
