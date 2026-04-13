

https://github.com/user-attachments/assets/6bc4f42c-9df9-42d8-ad22-be74be64ee58

Music+ 🎵

Bem-vindo ao Music+, um aplicativo moderno e elegante de player de música, desenvolvido com React Native e Expo.
Este projeto apresenta uma interface premium com efeitos de glassmorphism, animações suaves e um sistema de navegação robusto.

✨ **Novos Recursos & Funcionalidades**
🎨 **UI/UX Moderna & Premium**
- **Design Glassmorphism:** Uso de `expo-blur` para criar cabeçalhos, mini-players e sobreposições com efeito de vidro realista.
- **Tipografia e Cores:** Combinação da família de fontes Poppins, fundos profundamente escuros e gradientes vibrantes nos botões e destaques.
- **Micro-interações:** Animações fluídas utilizando `react-native-reanimated` nas transições de telas e nos componentes em destaque.

🎧 **Player de Música Completo**
- **Componente Centralizado (`AlbumPlayer`)**: Um excelente player genérico capaz de rodar qualquer álbum dinamicamente usando a nova capa para preencher o fundo de forma desfocada criando um ambiente visual imersivo e colorido com a cara do álbum.
- **Controles Reais de Áudio**: Integração total com `expo-av` para reproduzir áudios MP3 e M4A. Capacidade de `Play/Pause`, `Next/Previous`, Botão `Shuffle` e Slider de progresso para avançar a música em tempo real!
- **Discoteca Pessoal Real**: Telas criadas e músicas mapeadas para artistas incríveis como Marina, Duda Beat, Joji, Slayyyter e Tove Lo contemplando mais de 8 álbuns!

🛠 **Destaques Técnicos**
- **Arquitetura Baseada em Arquivos (Expo Router):** Navegação fluida, transições animadas personalizadas no `_layout`, suportando roteamento aninhado e navegação sem telas em branco.
- **Mapeamento de Dados Otimizado**: Separação clara de Metadados e arquivos locais em estruturas de array eficientes (`jojiDataMusic.ts`, etc), em vez de poluir os componentes da UI.
- **TypeScript & Qualidade**: Base de código toda tipada com checagem rigorosa, zero telas brancas e estrutura sustentável.

---
## 📱 Imagens do projeto.



https://github.com/user-attachments/assets/a7679a38-fef1-4db8-ab68-72b56c8cc5c0



## 🚀 Get Started

1. **Install dependencies**


   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## 📱 Estrutura do Projeto

- **`src/app`**: Telas principais da aplicação, agrupadas em abas (`(tabs)`) e sub-rotas como `/pages` (perfil artístico) e `/play` (telas de escuta de álbuns).
- **`src/components/ui`**: Componentes de UI modulares como `AlbumPlayer`, `GradientCard`, `MediaItem` e `SearchBar`.
- **`src/constants`**: Variáveis fixas de Estilo (Cores Globais com suporte dark dinâmico, Fontes, Sombras e Espaçamentos).
- **`src/data`**: Toda a camada estrutural de metadados das Músicas ligando o app ao áudio real.
- **`src/albuns`**: Localização dos artefatos multimídia, músicas MP3 e M4A.

## 🤝 Join the Community

- [Expo on GitHub](https://github.com/expo/expo)
- [Discord community](https://chat.expo.dev)
