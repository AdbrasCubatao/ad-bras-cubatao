  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !request.trim()) return

    try {
      setSubmitting(true)
      const { error } = await supabase.from('prayer_requests').insert([
        {
          name: name.trim(),
          request: request.trim()
        }
      ])

      if (error) throw error

      setName('')
      setRequest('')
      setSuccessMsg('Seu pedido de oração foi enviado com sucesso!')
      setTimeout(() => setSuccessMsg(''), 5000)
      fetchPrayers()
    } catch (err) {
      alert('Erro no Supabase: ' + (err.message || 'Falha ao salvar'))
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }
