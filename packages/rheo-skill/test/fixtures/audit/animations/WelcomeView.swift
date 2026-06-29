import SwiftUI

struct WelcomeView: View {
  var body: some View {
    Text("Welcome")
      .transition(.opacity)
      .animation(.repeatForever(autoreverses: true), value: true)
  }
}
