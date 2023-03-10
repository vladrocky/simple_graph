
const reqURL = 'http://localhost:3000/levels';



let matrix


let matrix_nodes = []
let nodes = [];
let edges = [];

axios.get(reqURL)
    .then((response) => {
        matrix = response.data
        console.log(matrix[0]);

        return matrix[0].matrix

        // тут просто выбираем какой level передать дальше для отображения
        // return matrix[1].matrix
        // return matrix[2].matrix
    })
    .then((data) => {
        let matrixData = document.createElement('div');
        let table = document.createElement('table');

        matrixData.style.color = '#ffffff';

        data.forEach(str => {
            let row = document.createElement('tr');
            str.forEach(val => {
                let dat = document.createElement('td')
                dat.innerText = val;
                row.appendChild(dat);
            })

            table.appendChild(row);

        });

        matrixData.appendChild(table);

        document.getElementById('app').appendChild(matrixData);

        return data
    })
    .then((data) => {
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            let node = {
                id: i,
                label: i.toString(),
                "node size": 30,
            }
            nodes.push(node);

            for (let j = 0; j < data.length; j++) {

                if (data[i][j] == 1) {
                    let edge = {
                        from: i,
                        to: j,
                        arrows: "to",
                        edge_size: 10,
                    }
                    edges.push(edge);
                }
            }

        }
    })
    .then(() => {
        let data = { nodes: nodes, edges: edges };
        //let options = { "physics": { "barnesHut": { "gravitationalConstant": -4000, "springConstant": 0.006, "damping": 0.02 }, "repulsion": { "nodeDistance": 600 } } };
        let options = {
            navigation: true,
            smoothCurves: false,
            physics: {
                barnesHut: {
                    enabled: false
                }
            },
            edges: {
                width: 1,
                style: 'line',
                color: {
                    color: '#eeeeee',
                    highlight: '#fc0'
                }
            },
            nodes: {
                shape: 'circle',
                font: {
                    size: 10,
                    color: '#eeeeee'
                },
                color: {
                    border: '#ccc',
                    background: '#1b1f27',
                    highlight: {
                        border: '#fc0',
                        background: '#000000',
                    }
                }
            }
        };

        let container = document.getElementById('graph');
        container.style.height = "600px";
        let network = new vis.Network(container, data, options);
    })



//var nodes = new vis.DataSet([{ id: 1, label: "Log Start", "node_size": 30 }, { id: 2, label: "Event_1", "node_size": 30 }]);
//var edges = new vis.DataSet([{ from: 1, to: 2, arrows: "to", edge_size: 1 }, { from: 1, to: 3, arrows: "to", edge_size: 10 }]);

// var data = { nodes: nodes, edges: edges };
// var options = { "physics": { "barnesHut": { "gravitationalConstant": -4000, "springConstant": 0.006, "damping": 0.02 }, "repulsion": { "nodeDistance": 300 } } };

// var container = document.getElementById('graph');
// var network = new vis.Network(container, data, options);