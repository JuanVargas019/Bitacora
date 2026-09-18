import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habito } from '@/types/habito';

const CLAVE_STORAGE = '@habitos_diarios_v1';
export const MAX_HABITOS = 5;

export function useHabitos() {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [cargando, setCargando] = useState(true);

  // Cargar al montar
  useEffect(() => {
    const cargar = async () => {
      try {
        const guardado = await AsyncStorage.getItem(CLAVE_STORAGE);
        setHabitos(guardado ? (JSON.parse(guardado) as Habito[]) : []);
      } catch (error) {
        console.warn('No se pudo leer el almacenamiento:', error);
        setHabitos([]);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  // Guardar en cada cambio (el `if (cargando) return` evita
  // pisar los datos guardados con el arreglo vacío del primer render)
  useEffect(() => {
    if (cargando) return;
    AsyncStorage.setItem(CLAVE_STORAGE, JSON.stringify(habitos)).catch((error) =>
      console.warn('No se pudo guardar:', error),
    );
  }, [habitos, cargando]);

  const alternarHabito = (id: string) => {
    setHabitos((actuales) =>
      actuales.map((habito) =>
        habito.id === id ? { ...habito, completado: !habito.completado } : habito,
      ),
    );
  };

  const agregarHabito = (nombre: string, icono: string) => {
    const limpio = nombre.trim();
    if (!limpio || habitos.length >= MAX_HABITOS) return;

    const nuevo: Habito = {
      id: Date.now().toString(),
      nombre: limpio,
      icono: icono || '⭐',
      racha: 0,
      completado: false,
    };
    setHabitos((actuales) => [...actuales, nuevo]);
  };

  const eliminarHabito = (id: string) => {
    setHabitos((actuales) => actuales.filter((habito) => habito.id !== id));
  };

  const completados = habitos.filter((h) => h.completado).length;
  const total = habitos.length;
  const porcentaje = total === 0 ? 0 : Math.round((completados / total) * 100);

  return {
    habitos,
    cargando,
    completados,
    total,
    porcentaje,
    alternarHabito,
    agregarHabito,
    eliminarHabito,
  };
}