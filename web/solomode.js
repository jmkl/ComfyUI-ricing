import { app } from "../../../scripts/app.js";


function concate_arr(arrays) {
    let changed = true;

    while (changed) {
        changed = false;

        for (let i = 0; i < arrays.length; i++) {
            for (let j = i + 1; j < arrays.length; j++) {
                if (arrays[i].some(val => arrays[j].includes(val))) {
                    arrays[i] = [...new Set([...arrays[i], ...arrays[j]])];
                    arrays.splice(j, 1);
                    changed = true;
                    break;
                }
            }
            if (changed) {
                break;
            }
        }
    }

    return arrays;
}
const ext = {
    name: "julnodes.SoloMode",
    init(app) {

        window.addEventListener("keydown", (e) => {
            if (e.key == "`") {
                const selected_nodes = app.graph._nodes.filter(e => e.is_selected);
                const _ia = app.graph.links.map(e => [e.origin_id, e.target_id]).filter(e => e != null)
                const result = concate_arr(_ia);
                if (selected_nodes.length <= 0) {
                    app.graph._nodes.forEach(e => e.changeMode(0));
                    return;
                }
                const selected_node_id = selected_nodes.map(e => e.id)[0];
                const selected_ids = result.filter(e => e.includes(selected_node_id))[0]


                for (const n of app.graph._nodes) {
                    n.changeMode(selected_ids.includes(n.id) ? 0 : 2)
                }
            }
        })



    },
    setup(app) {


    },
    beforeRegisterNodeDef(nodeType) {


    },

    nodeCreated(node, app) {



    }
};

app.registerExtension(ext);