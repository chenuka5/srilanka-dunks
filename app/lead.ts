'use server';

export async function submitLeadAction(endpointUrl: string, formData: FormData) {
  try {
    const params = new URLSearchParams();
    
    // Map form entries
    formData.forEach((value, key) => {
      params.append(key, value.toString());
    });

    const response = await fetch(endpointUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    return { success: true };
  } catch (error) {
    return { error: 'Failed to submit form. Please try again.' };
  }
}