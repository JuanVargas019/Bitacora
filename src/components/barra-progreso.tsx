import { StyleSheet, Text, View } from 'react-native';
import { COLORES } from '@/constants/colores-habitos';

type Props = {
  completados: number;
  total: number;
  porcentaje: number;
};

export function BarraProgreso({ completados, total, porcentaje }: Props) {
  return (
    <View style={estilos.tarjeta}>
      <Text style={estilos.titulo}>Mi Rutina</Text>
      <Text style={estilos.subtitulo}>Mantente constante</Text>

      <Text style={estilos.contador}>
        {completados}/{total}
      </Text>
      <Text style={estilos.subtitulo}>completados hoy</Text>

      <View style={estilos.barraFondo}>
        <View style={[estilos.barraRelleno, { width: `${porcentaje}%` }]} />
      </View>
      <Text style={estilos.porcentaje}>{porcentaje}%</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: COLORES.tarjeta,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: { color: COLORES.texto, fontSize: 26, fontWeight: '700' },
  subtitulo: { color: COLORES.textoSuave, fontSize: 14, marginTop: 2 },
  contador: { color: COLORES.texto, fontSize: 44, fontWeight: '800', marginTop: 12 },
  barraFondo: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORES.borde,
    marginTop: 16,
    overflow: 'hidden',
  },
  barraRelleno: { height: '100%', borderRadius: 6, backgroundColor: COLORES.acento },
  porcentaje: { color: COLORES.acento, fontSize: 13, fontWeight: '600', marginTop: 8 },
});