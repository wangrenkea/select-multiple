export function offset(dom, distance) {
    distance = distance || 0
    if (['BODY', null].includes(dom?.offsetParent?.nodeName) || !dom.offsetParent) {
        distance += dom.offsetTop
        return distance
    } else {
        distance += dom.offsetTop
        return offset(dom.offsetParent, distance)
    }
}


export function bind(dom, evname, fn) {
    if (dom.addEventListener) {
        dom.addEventListener(evname, fn);
    } else {
        dom.attachEvent('on' + evname, fn);
    }
}

export function unbind(dom, evname, fn) {
    if (dom.removeEventListener) {
        dom.removeEventListener(evname, fn, false);
    } else {
        dom.detachEvent('on' + evname, fn);
    }
}