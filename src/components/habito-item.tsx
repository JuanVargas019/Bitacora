import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Habito } from '@/types/habito';
import { COLORES } from '@/constants/colores-habitos';

type Props = {
  habito: Habito;
  onPress: () => void;
  onLongPress: () => void;
};

export function HabitoItem({ habito, onPress, onLongPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[estilos.fila, habito.completado && estilos.filaCompletada]}
    >
      <Text style={estilos.icono}>{habito.icono}</Text>
      <Text style={[estilos.nombre, habito.completado && estilos.nombreCompletado]}>
        {habito.nombre}
      </Text>
      <View style={[estilos.casilla, habito.completado && estilos.casillaMarcada]}>
        {habito.completado && <Text style={estilos.check}>✓</Text>}
      </View>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORES.fila,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  filaCompletada: { borderColor: COLORES.acento },
  icono: { fontSize: 20, marginRight: 10 },
  nombre: { flex: 1, color: COLORES.texto, fontSize: 16 },
  nombreCompletado: { color: COLORES.textoSuave, textDecorationLine: 'line-through' },
  racha: { color: COLORES.textoSuave, fontSize: 13, marginRight: 12 },
  casilla: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORES.borde,
    alignItems: 'center',
    justifyContent: 'center',
  },
  casillaMarcada: { backgroundColor: COLORES.acento, borderColor: COLORES.acento },
  check: { color: COLORES.fondo, fontSize: 14, fontWeight: '800' },
});