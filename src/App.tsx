import { useCallback } from 'react';
import ReactFlow, { addEdge, Background, Connection, ConnectionMode, Controls, Node, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';

import { zinc } from 'tailwindcss/colors'
import DefaultEdge from './components/edges/DefaultEdge';
import { Square } from './components/nodes/Square';

const NODE_TYPES = {
  square: Square,
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 200,
      y: 300,
    },
    data: {
      
    },
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 500,
      y: 300,
    },
    data: {
      
    },
  }
] satisfies Node[]

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

  return (
    <div className='w-screen h-screen'>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={EDGE_TYPES}
        defaultEdgeOptions={{
          type: 'default',
        }}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode={ConnectionMode.Loose}
      >
        <Background
          gap={12}
          size={2}
          color={zinc[200]}
        />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default App
