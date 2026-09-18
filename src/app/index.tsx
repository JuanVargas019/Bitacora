import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useHabitos, MAX_HABITOS } from '@/hooks/use-habitos';
import { HabitoItem } from '@/components/habito-item';
import { BarraProgreso } from '@/components/barra-progreso';
import { COLORES } from '@/constants/colores-habitos';

const EMOJIS_DISPONIBLES = ['⭐', '📖', '💧', '🧘', '💪', '✍️', '🥗', '😴', '🎮', '💊', '🎶', '💼', '🛀', '🛏️'];

export default function HomeScreen() {
  const {
    habitos,
    cargando,
    completados,
    total,
    porcentaje,
    alternarHabito,
    agregarHabito,
    eliminarHabito,
  } = useHabitos();

  const [textoNuevo, setTextoNuevo] = useState('');
  const [emojiElegido, setEmojiElegido] = useState('⭐');
  const [mostrarInput, setMostrarInput] = useState(false);

  const confirmarAgregar = () => {
    agregarHabito(textoNuevo, emojiElegido);
    setTextoNuevo('');
    setEmojiElegido('⭐');
    setMostrarInput(false);
  };

  if (cargando) {
    return (
      <SafeAreaView style={[estilos.pantalla, estilos.centrado]}>
        <ActivityIndicator size="large" color={COLORES.acento} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilos.pantalla}>
      <StatusBar barStyle="light-content" />

      <Text style={estilos.tituloApp}>📚To-Do</Text>
 
      <FlatList
        data={habitos}
        keyExtractor={(habito) => habito.id}
        contentContainerStyle={estilos.lista}
        ListHeaderComponent={
          <BarraProgreso completados={completados} total={total} porcentaje={porcentaje} />
        }
        renderItem={({ item }) => (
          <HabitoItem
            habito={item}
            onPress={() => alternarHabito(item.id)}
            onLongPress={() => eliminarHabito(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={estilos.vacio}>Agrega tu primer hábito para empezar el día.</Text>
        }
        ListFooterComponent={
          <View style={estilos.pie}>
            {mostrarInput ? (
              <View style={estilos.bloqueFormulario}>
                <View style={estilos.filaEmojis}>
                  {EMOJIS_DISPONIBLES.map((emoji) => (
                    <Pressable
                      key={emoji}
                      onPress={() => setEmojiElegido(emoji)}
                      style={[
                        estilos.chipEmoji,
                        emoji === emojiElegido && estilos.chipEmojiSeleccionado,
                      ]}
                    >
                      <Text style={estilos.textoChipEmoji}>{emoji}</Text>
                    </Pressable>
                  ))}
                </View>
                <View style={estilos.filaInput}>
                  <TextInput
                    value={textoNuevo}
                    onChangeText={setTextoNuevo}
                    placeholder="Nombre del hábito"
                    placeholderTextColor={COLORES.textoSuave}
                    style={estilos.input}
                    autoFocus
                    onSubmitEditing={confirmarAgregar}
                    returnKeyType="done"
                  />
                  <Pressable style={estilos.botonGuardar} onPress={confirmarAgregar}>
                    <Text style={estilos.textoBotonGuardar}>Guardar</Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <Pressable
                style={[estilos.boton, total >= MAX_HABITOS && estilos.botonInactivo]}
                disabled={total >= MAX_HABITOS}
                onPress={() => setMostrarInput(true)}
              >
                <Text style={estilos.textoBoton}>
                  {total >= MAX_HABITOS
                    ? `Máximo ${MAX_HABITOS} hábitos`
                    : 'Agregar nuevo hábito'}
                </Text>
              </Pressable>
            )}
            <Text style={estilos.ayuda}>
              Toca un hábito para marcarlo. Mantén presionado para eliminarlo.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: COLORES.fondo },
  centrado: { justifyContent: 'center', alignItems: 'center' },
  tituloApp: {
    color: COLORES.texto,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 16,
  },
  lista: { paddingHorizontal: 16, paddingBottom: 32 },
  vacio: { color: COLORES.textoSuave, textAlign: 'center', marginVertical: 24 },
  pie: { marginTop: 14 },
  bloqueFormulario: { gap: 10 },
  filaEmojis: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chipEmoji: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORES.fila,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  chipEmojiSeleccionado: { borderColor: COLORES.acento },
  textoChipEmoji: { fontSize: 20 },
  boton: {
    backgroundColor: COLORES.acento,
    borderRadius: 26,
    paddingVertical: 15,
    alignItems: 'center',
  },
  botonInactivo: { backgroundColor: COLORES.borde },
  textoBoton: { color: COLORES.fondo, fontSize: 15, fontWeight: '700' },
  filaInput: { flexDirection: 'row', gap: 10 },
  input: {
    flex: 1,
    backgroundColor: COLORES.fila,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: COLORES.texto,
  },
  botonGuardar: {
    backgroundColor: COLORES.acento,
    borderRadius: 14,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  textoBotonGuardar: { color: COLORES.fondo, fontWeight: '700' },
  ayuda: { color: COLORES.textoSuave, fontSize: 12, textAlign: 'center', marginTop: 12 },
});