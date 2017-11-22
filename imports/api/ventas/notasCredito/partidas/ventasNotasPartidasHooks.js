/**
 * Created by Héctor on 21/10/2017.
 */
import {_} from 'meteor/underscore';
import {VentasNotasPartidas} from "./collection";
import {VentasNotasCredito} from "../collection";

const ventasNotasPartidasHooks = {
    _actualizarNotaCredito(doc) {

    },

    afterInsertPartidnaNota(doc) {
        this._actualizarNotaCredito(doc);
    }
};

export default ventasNotasPartidasHooks;