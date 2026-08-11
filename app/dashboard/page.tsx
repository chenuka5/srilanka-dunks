<form action={logJumpAction} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
  <div>
    <label className="block text-xs text-gray-400 font-mono mb-2 uppercase">
      Standing Vertical (CM)
    </label>
    <input
      type="number"
      step="0.1"
      name="standingVertical"
      placeholder="e.g. 75"
      required
      className="w-full bg-black border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-red-600"
    />
  </div>

  <div>
    <label className="block text-xs text-gray-400 font-mono mb-2 uppercase">
      Running Vertical (CM)
    </label>
    <input
      type="number"
      step="0.1"
      name="runningVertical"
      placeholder="e.g. 88"
      required
      className="w-full bg-black border border-neutral-800 rounded p-3 text-white focus:outline-none focus:border-red-600"
    />
  </div>

  <button
    type="submit"
    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded uppercase tracking-wider transition-colors"
  >
    Record Result →
  </button>
</form>