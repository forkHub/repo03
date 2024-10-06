interface TPostMessage {
    type: string
    payload: any
}

window.onmessage = (e) => {
    if (e.data.type == 'prefab_update') {
        console.group("on message");
        console.log(e);
        let form = document.forms[0];
        form;
        // form.elements[]
        console.groupEnd();
    }
}

window.onload = () => {
    let form = document.forms[0];
    console.log(form)

    form.onsubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        var object = {};
        new FormData(form).forEach(function (value: FormDataEntryValue, key: string) {
            console.log("key: " + key);
            (object as any)[key] = value;
        });

        //kirim ke parent
        try {
            let m: TPostMessage = {
                type: 'prefab_update',
                payload: object
            }

            window.parent.postMessage(m);
        } catch (e) {
            console.error(e);
        }
    }
}