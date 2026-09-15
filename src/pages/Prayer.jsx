  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !request.trim()) return

    try {
      setSubmitting(true)
      const today = new Date().toISOString().split('T')[0]

      // Enviamos 'message' e 'request' juntos para garantir compatibilidade total
      const { error } = await supabase.from('prayer_requests').insert([
        {
          name: name.trim(),
          message: request.trim(),
          request: request.trim(),
          request_date: today
        }
      ])

      if (error) throw error

      setName('')
      setRequest('')
      setSuccessMsg('Seu pedido de oração foi enviado com sucesso!')
      setTimeout(() => setSuccessMsg(''), 5000)
      fetchPrayers()
    } catch (err) {
      alert('Erro ao enviar pedido: ' + (err.message || 'Verifique sua conexão'))
    } finally {
      setSubmitting(false)
    }
  }
