import { useState } from 'react'
import './App.css'

class Persona{
  constructor(nombre,cedula){
    this.id = Date.now() + Math.random()
    this.nombre = nombre
    this.cedula = cedula
    this.hora = new Date().toLocaleTimeString()
  }
}

class FilaTurnos{
  constructor(){ this.fila = [] }
  encolar(p){ this.fila.push(p) }
  desencolar(){ return this.fila.shift() }
}

function App() {
  const [fila, setFila] = useState([])
  const [nombre, setNombre] = useState('')
  const [cedula, setCedula] = useState('')

  const gestor = new FilaTurnos()
  gestor.fila = fila

  const registrar = () => {
    if(!nombre.trim() ||!cedula.trim()){
      alert('Llena nombre y cédula')
      return
    }
    const nueva = new Persona(nombre, cedula)
    setFila([...fila, nueva])
    setNombre('')
    setCedula('')
  }

  const atender = () => {
    if(fila.length === 0) return
    const nuevaFila = [...fila]
    nuevaFila.shift()
    setFila(nuevaFila)
  }

  return (
    <>
      <header>
        <h1>⚡️ FILA DE TURNOS FIFO</h1>
        <p>Sistema de gestión de fila - React + POO</p>
      </header>

      <main>
        <div>
          <section className="card">
            <h2>Registrar Persona</h2>
            <label>Nombre</label>
            <input
              value={nombre}
              onChange={(e)=>setNombre(e.target.value)}
              placeholder="Ej: Juan Pérez"
            />
            <label>Cédula</label>
            <input
              value={cedula}
              onChange={(e)=>setCedula(e.target.value)}
              placeholder="Ej: 105483..."
            />
            <button className="btn-add" onClick={registrar}>AGREGAR A LA FILA</button>
          </section>

          <section className="card">
            <h2>Turno Actual</h2>
            <div className="turno-actual">
              {fila.length === 0? (
                <span style={{opacity:0.5}}>Fila vacía</span>
              ) : (
                <div>
                  <div className="turno-numero">#1 - {fila[0].nombre}</div>
                  <div>{fila[0].cedula}</div>
                  <div className="hora">{fila[0].hora}</div>
                </div>
              )}
            </div>
            <button className="btn-attend" onClick={atender} disabled={fila.length===0}>
              ATENDER SIGUIENTE
            </button>
          </section>
        </div>

        <section className="card">
          <h2>Fila Completa ({fila.length})</h2>
          <div className="lista">
            {fila.length === 0 && <div className="vacio">No hay personas en fila</div>}
            {fila.map((p, i) => (
              <div key={p.id} className="ticket">
                <div>
                  <b>#{i+1} {p.nombre}</b><br/>
                  <small>{p.cedula} - {p.hora}</small>
                </div>
                <small className="badge">{i===0?'SIGUIENTE':''}</small>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default App